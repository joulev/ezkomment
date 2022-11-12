import { Timestamp } from "firebase-admin/firestore";
import { firestoreAdmin } from "~/server/firebase/app";
import {
    COMMENTS_COLLECTION,
    PAGES_COLLECTION,
    SITES_COLLECTION,
    USERS_COLLECTION,
} from "~/server/firebase/collections";
import { handleFirestoreError } from "~/server/errors/firestore-error";
import {
    deleteRefArray,
    getDocumentInTransaction,
    getDocumentInTransactionWithUid,
} from "~/server/utils/firestore";
import {
    ClientSite,
    Comment,
    CreateSiteBodyParams,
    Page,
    Site,
    UpdateSiteBodyParams,
    SiteStatistics,
} from "~/types/server";

/**
 * Gets a site, and its pages, with the given id.
 *
 * @param uid The user's uid
 * @param siteId The site's id
 * @returns The site, and an array of pages. See `ClientSite`
 */
export async function get(uid: string, siteId: string): Promise<ClientSite> {
    const siteRef = SITES_COLLECTION.doc(siteId);
    return await firestoreAdmin.runTransaction(async t => {
        const siteData = await getDocumentInTransactionWithUid<Site>(t, siteRef, uid);
        const { docs } = await t.get(PAGES_COLLECTION.where("siteId", "==", siteId));
        const pages = docs.map(doc => doc.data()) as Page[];
        const clientSiteData: ClientSite = { ...siteData, pages };
        return clientSiteData;
    });
}

/**
 * Get the domain of a site with the given id, without authentication. This is used to determine if
 * frame-ancestors should be set in the response header.
 *
 * @param siteId The site's id
 * @returns The domain of the site
 */
export async function getDomain(siteId: string) {
    const siteRef = SITES_COLLECTION.doc(siteId);
    return await firestoreAdmin.runTransaction(async t => {
        const siteData = await getDocumentInTransaction<Site>(t, siteRef);
        return siteData.domain;
    });
}

/**
 * Lists all comments of a site.
 *
 * @param siteId The site'id
 * @returns An array of comments, sorted by lastest first.
 */
export async function getComments(siteId: string) {
    const commentSnapshots = await COMMENTS_COLLECTION.where("siteId", "==", siteId).get();
    const data = commentSnapshots.docs.map(doc => doc.data()) as Comment[];
    return data.sort((c1, c2) => c2.date - c1.date);
}

export async function getStatistics(uid: string, siteId: string) {
    const MILLIS_PER_DAY = 1000 * 60 * 60 * 24;
    const toUTCMidnight = (timestamp: number) => timestamp - (timestamp % MILLIS_PER_DAY);

    const siteRef = SITES_COLLECTION.doc(siteId);
    return await firestoreAdmin.runTransaction(async t => {
        await getDocumentInTransactionWithUid<Site>(t, siteRef, uid);
        const siteComments = await getComments(siteId);
        const curTimestamp = toUTCMidnight(Timestamp.now().toMillis());
        const totalComment: number[] = Array.from({ length: 30 }, _ => 0);
        const newComment: number[] = Array.from({ length: 30 }, _ => 0);
        const finalIndex = siteComments.length - 1;

        let oldCount = 0; // previous value of curCount
        let curCount: number; // how many comments have we traversed through
        let daysAgo = 29;

        for (let i = finalIndex; i >= 0; i--) {
            const { date } = siteComments[i];
            const commentDaysAgo = ((curTimestamp - toUTCMidnight(date)) / MILLIS_PER_DAY) | 0;
            if (commentDaysAgo < daysAgo) {
                curCount = finalIndex - i;
                newComment[daysAgo] = curCount - oldCount;
                while (daysAgo > commentDaysAgo) {
                    totalComment[daysAgo] = curCount;
                    daysAgo--;
                }
                oldCount = curCount;
            }
        }
        curCount = siteComments.length;
        newComment[daysAgo] = curCount - oldCount;
        for (; daysAgo >= 0; daysAgo--) totalComment[daysAgo] = curCount;

        const statistics: SiteStatistics = { totalComment, newComment };
        return statistics;
    });
}

/**
 * Creates a site.
 *
 * @param uid The id of the owner of the site
 * @param data The data of the site to be created
 * @returns The id of the created site.
 */
export async function create(uid: string, data: CreateSiteBodyParams) {
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
        lastUpdated: Timestamp.now().toMillis(),
    };
    return await firestoreAdmin.runTransaction(async t => {
        /**
         * Ensure uniqueness.
         */
        t.create(USERS_COLLECTION.doc(uid).collection("sites").doc(name), { id: siteId });
        t.create(siteRef, newSite);
        return newSite;
    });
}

/**
 * Updates a site with the given id.
 *
 * @param uid The id of the owner of the site
 * @param siteId The site's id
 */
export async function update(uid: string, siteId: string, data: UpdateSiteBodyParams) {
    const siteRef = SITES_COLLECTION.doc(siteId);
    const newName = data.name;
    await firestoreAdmin.runTransaction(async t => {
        // Look up the site's name
        const siteData = await getDocumentInTransactionWithUid<Site>(t, siteRef, uid);
        if (newName !== undefined) {
            const oldName = siteData.name;
            const userSitesCollection = USERS_COLLECTION.doc(uid).collection("sites");
            t.delete(userSitesCollection.doc(oldName));
            t.create(userSitesCollection.doc(newName), { id: siteId });
        }
        t.update(siteRef, { ...data, lastUpdated: Timestamp.now().toMillis() });
    });
}

/**
 * Deletes a site with the given id.
 *
 * @param uid The id of the owner of the site
 * @param siteId The site's id
 */
async function deleteSite(uid: string, siteId: string) {
    const siteRef = SITES_COLLECTION.doc(siteId);
    await firestoreAdmin.runTransaction(async t => {
        const siteData = await getDocumentInTransactionWithUid<Site>(t, siteRef, uid);
        t.delete(USERS_COLLECTION.doc(uid).collection("sites").doc(siteData.name));
    });
    await firestoreAdmin.recursiveDelete(siteRef);
}
/**
 * Deletes all pages of a site, including their comments as well. This method can also update the
 * site, if required.
 *
 * @param siteId The site's id
 * @param update If true, the site will be updated. Default to false.
 */
export async function deletePages(siteId: string, update: boolean = false) {
    const pageSnapshots = await PAGES_COLLECTION.where("siteId", "==", siteId).get();
    const pageDocs = pageSnapshots.docs;
    const pageRefs = pageDocs.map(doc => doc.ref);
    const pageIds = pageDocs.map(doc => doc.id);
    const promises: Promise<unknown>[] = [
        deleteRefArray(pageRefs), // DELETE all pages
        // ...pageIds.map(id => deletePageComments(id)), // And their comments
    ];
    if (update) {
        // The update could fail here, if the site does not exist
        const updatePromise = SITES_COLLECTION.doc(siteId)
            .update({ pageCount: 0, totalCommentCount: 0, pendingCommentCount: 0 })
            .catch(handleFirestoreError);
        promises.push(updatePromise);
    }
    await Promise.all(promises);
}
export async function remove(uid: string, siteId: string) {
    await deleteSite(uid, siteId);
    await deletePages(siteId);
}
