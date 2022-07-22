import { FieldValue } from "firebase-admin/firestore";

import { firestoreAdmin } from "~/server/firebase/firebaseAdmin";
import {
    COMMENTS_COLLECTION,
    PAGES_COLLECTION,
    SITES_COLLECTION,
} from "~/server/firebase/firestoreCollections";
import CustomApiError from "~/server/utils/errors/customApiError";
import { handleFirestoreError } from "~/server/utils/errors/handleFirestoreError";
import {
    deleteQuery,
    deleteRefArray,
    getDocumentInTransaction,
    getPageInTransaction,
    getSiteInTransaction,
} from "~/server/utils/firestoreUtils";

import {
    ClientPage,
    Comment,
    CreatePageBodyParams,
    Page,
    UpdateCommentBodyParams,
    UpdatePageBodyParams,
} from "~/types/server";

function querySitePagesById(siteId: string) {
    return PAGES_COLLECTION.where("siteId", "==", siteId);
}

/**
 * Gets the information of a page
 *
 * @param uid The id of the owner of the page
 * @param pageId The id of the page
 */
export async function getPageWithUid(uid: string, pageId: string) {
    const pageRef = PAGES_COLLECTION.doc(pageId);
    return await firestoreAdmin.runTransaction(async t => {
        const pageData = await getPageInTransaction(t, pageRef, uid);
        return pageData;
    });
}

export async function getClientPageWithUid(uid: string, pageId: string) {
    const pageRef = PAGES_COLLECTION.doc(pageId);
    return await firestoreAdmin.runTransaction(async t => {
        const pageData = await getPageInTransaction(t, pageRef, uid);
        const { docs } = await t.get(COMMENTS_COLLECTION.where("pageId", "==", pageId));
        const comments = docs
            .map(doc => doc.data())
            .sort((c1, c2) => c2.date - c1.date) as Comment[];
        const clientPageData: ClientPage = { ...pageData, comments };
        return clientPageData;
    });
}

/**
 * Creates a new page.
 *
 * @param uid The id of the owner of the page
 * @param data The data of the page
 */
export async function createPageWithUid(uid: string, data: CreatePageBodyParams) {
    const { siteId, url } = data;
    const pageRef = PAGES_COLLECTION.doc();
    const pageId = pageRef.id;
    const newPage: Page = {
        uid,
        id: pageId,
        ...data,
        totalCommentCount: 0,
        pendingCommentCount: 0,
    };
    return await firestoreAdmin.runTransaction(async t => {
        const siteRef = SITES_COLLECTION.doc(siteId);
        const siteData = await getSiteInTransaction(t, siteRef, uid);

        if (!url.includes(siteData.domain) && siteData.domain !== "*")
            throw new CustomApiError("Site domain and page url do not match", 409);

        // Increment the pageCount of the site by 1
        t.update(siteRef, { pageCount: FieldValue.increment(1) });
        t.create(pageRef, newPage);
        return newPage;
    });
}

/**
 * Updates a page with the given id.
 *
 * @param uid The id of the owner of the page
 * @param pageId The id of the page
 * @param data The data to update the page
 */
export async function updatePageWithUid(uid: string, pageId: string, data: UpdatePageBodyParams) {
    /**
     * Approve all pending comments of a page when auto approve is turned on
     *
     * @param pageId The id of the page
     */
    async function approveAllPendingComments(pageId: string) {
        await firestoreAdmin.runTransaction(async t => {
            const commentSnapshots = await t.get(
                COMMENTS_COLLECTION.where("pageId", "==", pageId).where("status", "==", "Pending")
            );
            const commentDocs = commentSnapshots.docs;
            const commentRefs = commentDocs.map(doc => doc.ref);
            const updateData: UpdateCommentBodyParams = { status: "Approved" };
            commentRefs.forEach(ref => t.update(ref, updateData));
        });
    }

    const pageRef = PAGES_COLLECTION.doc(pageId);
    const { autoApprove } = data;
    return await firestoreAdmin.runTransaction(async t => {
        const { siteId, pendingCommentCount } = await getPageInTransaction(t, pageRef, uid);
        /**
         * We need to approve all pending comments when auto approved is turned to true
         * Update the statistic as well
         */
        if (autoApprove) {
            await approveAllPendingComments(pageId);
            t.update(pageRef, { pendingCommentCount: 0 });
            t.update(SITES_COLLECTION.doc(siteId), {
                pendingCommentCount: FieldValue.increment(-pendingCommentCount),
            });
        }
        t.update(pageRef, data);
    });
}

export async function deletePageWithUid(uid: string, pageId: string) {
    const pageRef = PAGES_COLLECTION.doc(pageId);
    return await firestoreAdmin.runTransaction(async t => {
        const pageData = await getPageInTransaction(t, pageRef, uid);
        const { siteId, totalCommentCount, pendingCommentCount } = pageData;
        const siteRef = SITES_COLLECTION.doc(siteId);
        // Decrease the number of page by 1, decrease the number of total comment count,
        // and pending comment count
        t.update(siteRef, {
            pageCount: FieldValue.increment(-1),
            totalCommentCount: FieldValue.increment(-totalCommentCount),
            pendingCommentCount: FieldValue.increment(-pendingCommentCount),
        });
        t.delete(pageRef);
    });
}

export async function listSitePagesById(siteId: string) {
    const pageSnapshots = await querySitePagesById(siteId).get();
    return pageSnapshots.docs.map(doc => doc.data()) as Page[];
}

/**
 * Deletes all pages of a site, including their comments as well. This method can also update the
 * site, if required.
 *
 * @param siteId The site's id
 * @param update If true, the site will be updated. Default to false.
 */
export async function deleteSitePagesById(siteId: string, update: boolean = false) {
    try {
        const pageSnapshots = await querySitePagesById(siteId).get();
        if (pageSnapshots.empty) return;
        const pageDocs = pageSnapshots.docs;
        const pageRefs = pageDocs.map(doc => doc.ref);
        const pageIds = pageDocs.map(doc => doc.id);
        const promises: Promise<any>[] = [
            deleteRefArray(pageRefs), // DELETE all pages
            ...pageIds.map(id => deletePageComment(id)), // And their comments
        ];
        if (update) {
            const updateContent = {
                pageCount: 0, // No page
                totalCommentCount: 0, // No comment
                pendingCommentCount: 0, // Hence no pending comment
            };
            // The update could fail here, if the site does not exist.
            promises.push(SITES_COLLECTION.doc(siteId).update(updateContent));
        }
        return await Promise.all(promises);
    } catch (err) {
        handleFirestoreError(err);
    }
}

/**
 * Lists all comments of a page.
 *
 * @param pageId The page's id
 * @returns An array of comments, sorted with lastest first.
 */
export async function listPageComment(pageId: string) {
    const commentSnapshots = await COMMENTS_COLLECTION.where("pageId", "==", pageId).get();
    const data = commentSnapshots.docs.map(doc => doc.data()) as Comment[];
    return data.sort((c1, c2) => c2.date - c1.date);
}

/**
 * Lists all approved comments of a page.
 *
 * @param pageId The id of the page
 * @returns An array of comments, sorted with lastest first.
 */
export async function listPageApprovedComments(pageId: string) {
    const commentSnapshots = await COMMENTS_COLLECTION.where("pageId", "==", pageId)
        .where("status", "==", "Approved")
        .get();
    const data = commentSnapshots.docs.map(doc => doc.data()) as Comment[];
    return data.sort((c1, c2) => c2.date - c1.date);
}

/**
 * We will need to update the comment count of the page, if we delete all comments.
 * But this may be redudant in some case, for example if we want to delete all pages of a site.
 *
 * @param pageId The page's id
 * @param update If true, the page and site will be updated. Default to false.
 */
export async function deletePageComment(pageId: string, update: boolean = false) {
    const commentQuery = COMMENTS_COLLECTION.where("pageId", "==", pageId);
    const promises: Promise<any>[] = [deleteQuery(commentQuery)];
    if (update) {
        // The update could fail here, if the page does not exist.
        const updatePromise = firestoreAdmin.runTransaction(async t => {
            const pageRef = PAGES_COLLECTION.doc(pageId);
            const pageData = await getDocumentInTransaction<Page>(t, pageRef);
            const { siteId, totalCommentCount, pendingCommentCount } = pageData;
            const siteRef = SITES_COLLECTION.doc(siteId);
            const updateContent = {
                totalCommentCount: FieldValue.increment(-totalCommentCount),
                pendingCommentCount: FieldValue.increment(-pendingCommentCount),
            };
            t.update(siteRef, updateContent);
            t.update(pageRef, updateContent);
        });
        promises.push(updatePromise);
    }
    await Promise.all(promises);
}
