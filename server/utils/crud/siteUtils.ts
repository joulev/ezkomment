import { add } from "date-fns";

import { firestoreAdmin } from "~/server/firebase/firebaseAdmin";
import {
    PAGES_COLLECTION,
    SITES_COLLECTION,
    USERS_COLLECTION,
} from "~/server/firebase/firestoreCollections";
import { handleFirestoreError } from "~/server/utils/errors/handleFirestoreError";
import { deleteRefArray, getSiteInTransaction } from "~/server/utils/firestoreUtils";

import {
    ClientSite,
    CreateSiteBodyParams,
    Page,
    Site,
    SiteStatistics,
    UpdateSiteBodyParams,
} from "~/types/server";

import { deleteSitePagesById } from "./pageUtils";

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
        return await firestoreAdmin.runTransaction(async t => {
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
        return await firestoreAdmin.runTransaction(async t => {
            const siteData = await getSiteInTransaction(t, siteRef, uid);
            t.delete(USERS_COLLECTION.doc(uid).collection("sites").doc(siteData.name));
            await firestoreAdmin.recursiveDelete(siteRef);
        });
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
            ...siteIds.map(id => deleteSitePagesById(id)), // And all pages of these sites
        ]);
    } catch (err) {
        handleFirestoreError(err);
    }
}

/**
 * Gets statistic about the number of comments of the site during the last 30 days
 */
export async function getSiteStatistic(uid: string, siteId: string) {
    const siteRef = SITES_COLLECTION.doc(siteId);
    return await firestoreAdmin.runTransaction(async t => {
        // Security
        await getSiteInTransaction(t, siteRef, uid);
        const statisticDocs = (
            await t.get(
                siteRef
                    .collection("statistic")
                    .doc("LAST_30_DAYS")
                    .collection("last-30-days")
                    .orderBy("date")
            )
        ).docs;
        const todayDate = new Date();
        const _30DaysAgo = add(todayDate, { days: -30 }).toLocaleDateString("en-CA");
        // We will need to remove all redudant information
        const toRemove = statisticDocs.filter(doc => _30DaysAgo.localeCompare(doc.data().date) > 0);
        deleteRefArray(toRemove.map(doc => doc.ref));

        const statisticData = statisticDocs
            .filter(doc => _30DaysAgo.localeCompare(doc.data().date) <= 0)
            .map(doc => doc.data()) as any[];
        const totalComment: number[] = [];
        const newComment: number[] = [];

        for (let i = 30; i > 0; i--) {
            const iDaysAgo = add(todayDate, { days: -i }).toLocaleDateString("en-CA");
            if (statisticData[0]?.date === iDaysAgo) {
                const data = statisticData.shift();
                totalComment.push(data.totalComment);
                newComment.push(data.newComment);
            } else {
                totalComment.push(-1); // Hmm, this implementation does not seem to work very well?
                newComment.push(0);
            }
        }
        const statistic: SiteStatistics = { totalComment, newComment };
        return statistic;
    });
}
