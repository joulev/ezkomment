import { firestoreAdmin } from "~/server/firebase/firebaseAdmin";
import {
    COMMENTS_COLLECTION,
    PAGES_COLLECTION,
    SITES_COLLECTION,
    USERS_COLLECTION,
} from "~/server/firebase/firestoreCollections";
import { handleFirestoreError } from "~/server/utils/errors/handleFirestoreError";
import { deleteRefArray, getSiteInTransaction } from "~/server/utils/firestoreUtils";

import {
    ClientSite,
    Comment,
    CreateSiteBodyParams,
    Page,
    Site,
    SiteStatistics,
    UpdateSiteBodyParams,
} from "~/types/server";

import { deletePageComments } from "./pageUtils";

function queryUserSitesById(uid: string) {
    return SITES_COLLECTION.where("uid", "==", uid);
}

/**
 * Get a site with the given id.
 *
 * @param uid The id of the owner of this site
 * @param siteId The site's id
 * @returns The data of the site.
 */
export async function getSiteById(uid: string, siteId: string) {
    const siteRef = SITES_COLLECTION.doc(siteId);
    return await firestoreAdmin.runTransaction(async t => {
        const siteData = await getSiteInTransaction(t, siteRef, uid);
        return siteData;
    });
}

export async function getClientSiteById(uid: string, siteId: string) {
    const siteRef = SITES_COLLECTION.doc(siteId);
    return await firestoreAdmin.runTransaction(async t => {
        const siteData = await getSiteInTransaction(t, siteRef, uid);
        const { docs } = await t.get(PAGES_COLLECTION.where("siteId", "==", siteId));
        const pages = docs.map(doc => doc.data()) as Page[];
        const tempStat = Array.from({ length: 30 }).map(_ => 0);
        const statistic: SiteStatistics = {
            totalComment: tempStat,
            newComment: tempStat,
        };
        const clientSiteData: ClientSite = { ...siteData, pages, statistic };
        return clientSiteData;
    });
}

/**
 * Creates a site.
 *
 * @param uid The id of the owner of the site
 * @param data The data of the site to be created
 * @returns The id of the created site.
 */
export async function createSite(uid: string, data: CreateSiteBodyParams) {
    try {
        const { name } = data;
        const siteRef = SITES_COLLECTION.doc();
        const siteId = siteRef.id;
        const newSite: Site = {
            uid,
            id: siteId,
            ...data,
            pageCount: 0,
            totalCommentCount: 0,
            pendingCommentCount: 0,
        };
        return await firestoreAdmin.runTransaction(async t => {
            /**
             * Ensure uniqueness.
             */
            t.create(USERS_COLLECTION.doc(uid).collection("sites").doc(name), { id: siteId });
            t.create(siteRef, newSite);
            return newSite;
        });
    } catch (err) {
        handleFirestoreError(err);
    }
}

/**
 * Updates a site with the given id.
 *
 * @param uid The id of the owner of the site
 * @param siteId The site's id
 */
export async function updateSiteById(uid: string, siteId: string, data: UpdateSiteBodyParams) {
    try {
        const siteRef = SITES_COLLECTION.doc(siteId);
        const newName = data.name;
        await firestoreAdmin.runTransaction(async t => {
            // Look up the site's name
            const siteData = await getSiteInTransaction(t, siteRef, uid);
            if (newName !== undefined) {
                const oldName = siteData.name;
                const userSitesCollection = USERS_COLLECTION.doc(uid).collection("sites");
                t.delete(userSitesCollection.doc(oldName));
                t.create(userSitesCollection.doc(newName), { id: siteId });
            }
            t.update(siteRef, data);
        });
    } catch (err) {
        handleFirestoreError(err);
    }
}

/**
 * Deletes a site with the given id.
 *
 * @param uid The id of the owner of the site
 * @param siteId The site's id
 */
export async function deleteSiteById(uid: string, siteId: string) {
    try {
        const siteRef = SITES_COLLECTION.doc(siteId);
        await firestoreAdmin.runTransaction(async t => {
            const siteData = await getSiteInTransaction(t, siteRef, uid);
            t.delete(USERS_COLLECTION.doc(uid).collection("sites").doc(siteData.name));
        });
        await firestoreAdmin.recursiveDelete(siteRef);
    } catch (err) {
        handleFirestoreError(err);
    }
}

export async function listUserSitesById(uid: string) {
    const siteSnapshots = await queryUserSitesById(uid).get();
    return siteSnapshots.docs.map(doc => doc.data()) as Site[];
}

/**
 * Please help me come up with a better name for this method...
 */
export async function listUserBasicSitesById(uid: string) {
    const siteSnapshots = await USERS_COLLECTION.doc(uid).collection("sites").get();
    return siteSnapshots.docs.map(doc => doc.data());
}

export async function deleteUserSitesById(uid: string) {
    try {
        const siteSnapshots = await queryUserSitesById(uid).get();
        if (siteSnapshots.empty) return;
        const siteDocs = siteSnapshots.docs;
        const siteRefs = siteDocs.map(doc => doc.ref);
        const siteIds = siteDocs.map(doc => doc.id);
        const siteNameRefs = siteDocs.map(doc => {
            const { name } = doc.data() as Site;
            return USERS_COLLECTION.doc(uid).collection("sites").doc(name);
        });
        return await Promise.all([
            deleteRefArray(siteRefs), // Delete all sites
            deleteRefArray(siteNameRefs), // Delete all site name refs
            ...siteIds.map(id => deleteSitePages(id)), // And all pages of these sites
        ]);
    } catch (err) {
        handleFirestoreError(err);
    }
}

export async function listSitePages(siteId: string) {
    const pageSnapshots = await PAGES_COLLECTION.where("siteId", "==", siteId).get();
    return pageSnapshots.docs.map(doc => doc.data()) as Page[];
}

export async function listSiteComments(siteId: string) {
    const commentSnapshots = await COMMENTS_COLLECTION.where("siteId", "==", siteId).get();
    const data = commentSnapshots.docs.map(doc => doc.data()) as Comment[];
    return data.sort((c1, c2) => c2.date - c1.date);
}

/**
 * Deletes all pages of a site, including their comments as well. This method can also update the
 * site, if required.
 *
 * @param siteId The site's id
 * @param update If true, the site will be updated. Default to false.
 */
export async function deleteSitePages(siteId: string, update: boolean = false) {
    const pageSnapshots = await PAGES_COLLECTION.where("siteId", "==", siteId).get();
    const pageDocs = pageSnapshots.docs;
    const pageRefs = pageDocs.map(doc => doc.ref);
    const pageIds = pageDocs.map(doc => doc.id);
    const promises: Promise<unknown>[] = [
        deleteRefArray(pageRefs), // DELETE all pages
        ...pageIds.map(id => deletePageComments(id)), // And their comments
    ];
    if (update) {
        // The update could fail here, if the site does not exist
        const updatePromise = SITES_COLLECTION.doc(siteId)
            .update({
                pageCount: 0,
                totalCommentCount: 0,
                pendingCommentCount: 0,
            })
            .catch(handleFirestoreError);
        promises.push(updatePromise);
    }
    await Promise.all(promises);
}
