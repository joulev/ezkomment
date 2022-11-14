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
import { get as getPage, deleteComments } from "./page";
import defaultTemplate from "~/templates/default.html";
import {
    ClientSite,
    Comment,
    CreateSiteBodyParams,
    Page,
    Site,
    UpdateSiteBodyParams,
    SiteStatistics,
    SiteTemplate,
    UpdateSiteTemplateBodyParams,
    ExportSite,
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

export async function getExport(uid: string, siteId: string): Promise<ExportSite> {
    const { pages: rawPages, ...rest } = await get(uid, siteId);
    const [{ template }, ...pages] = await Promise.all([
        getTemplate(null, siteId),
        ...rawPages.map(page => getPage(uid, page.id, true)),
    ]);
    return { ...rest, pages, template };
}

/**
 * Get the domain of a site with the given id, without authentication. This is used to determine if
 * frame-ancestors should be set in the response header.
 *
 * @param siteId The site's id
 * @returns The domain of the site
 */
export async function getDomain(siteId: string): Promise<string> {
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
async function getComments(siteId: string): Promise<Comment[]> {
    const commentSnapshots = await COMMENTS_COLLECTION.where("siteId", "==", siteId).get();
    const data = commentSnapshots.docs.map(doc => doc.data()) as Comment[];
    return data.sort((c1, c2) => c2.date - c1.date);
}
function shiftTimestampToUTCMidnight(msSinceEpoch: number) {
    const date = new Date(msSinceEpoch);
    date.setUTCHours(0, 0, 0, 0);
    return Timestamp.fromDate(date);
}
export async function getStatistics(uid: string, siteId: string): Promise<SiteStatistics> {
    const MILLIS_PER_DAY = 1000 * 60 * 60 * 24;

    const siteRef = SITES_COLLECTION.doc(siteId);
    return await firestoreAdmin.runTransaction(async t => {
        await getDocumentInTransactionWithUid<Site>(t, siteRef, uid);
        const siteComments = await getComments(siteId);
        const curTimestamp = shiftTimestampToUTCMidnight(Timestamp.now().toMillis());

        const newComment: number[] = Array.from({ length: 30 }, _ => 0);
        const totalComment: number[] = Array.from({ length: 30 }, _ => 0);

        for (const comment of siteComments) {
            const commentTimestamp = shiftTimestampToUTCMidnight(comment.date);
            const daysSinceComment = Math.floor(
                (curTimestamp.toMillis() - commentTimestamp.toMillis()) / MILLIS_PER_DAY
            );
            if (daysSinceComment >= 30) break; // siteComments are sorted by latest first
            newComment[daysSinceComment]++;
        }

        totalComment[29] = newComment[29];
        for (let i = 28; i >= 0; i--) totalComment[i] = totalComment[i + 1] + newComment[i];

        return { totalComment, newComment };
    });
}

// for backward compatibility: my friend @VietAnh1010 refused to give it a more sensible name
const TEMPLATE_ID = "CUSTOMISATION";

/**
 * @param uid null if auth is not required, otherwise the user's uid
 */
export async function getTemplate(uid: string | null, siteId: string): Promise<SiteTemplate> {
    const siteRef = SITES_COLLECTION.doc(siteId);
    return await firestoreAdmin.runTransaction(async t => {
        if (uid) await getDocumentInTransactionWithUid<Site>(t, siteRef, uid);
        const templateSnapshot = await t.get(siteRef.collection("customisation").doc(TEMPLATE_ID));
        if (!templateSnapshot.exists) return { template: defaultTemplate };
        const { customisation: template } = templateSnapshot.data() as { customisation: string };
        return { template };
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

export async function updateTemplate(
    uid: string,
    siteId: string,
    data: UpdateSiteTemplateBodyParams
) {
    const siteRef = SITES_COLLECTION.doc(siteId);
    return await firestoreAdmin.runTransaction(async t => {
        await getDocumentInTransactionWithUid<Site>(t, siteRef, uid);
        // Completely replace the template. If the document does not exists, it will be created.
        t.set(siteRef.collection("customisation").doc(TEMPLATE_ID), data);
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
        ...pageIds.map(id => deleteComments(id)), // And their comments
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
