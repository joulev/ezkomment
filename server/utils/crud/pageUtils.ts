import { DocumentReference, FieldValue, Transaction } from "firebase-admin/firestore";

import { firestoreAdmin } from "~/server/firebase/firebaseAdmin";
import {
    COMMENTS_COLLECTION,
    PAGES_COLLECTION,
    SITES_COLLECTION,
} from "~/server/firebase/firestoreCollections";
import CustomApiError from "~/server/utils/errors/customApiError";
import { handleFirestoreError } from "~/server/utils/errors/handleFirestoreError";
import { deleteRefArray } from "~/server/utils/firestoreUtils";

import {
    ClientPage,
    Comment,
    CreatePageBodyParams,
    Page,
    UpdatePageBodyParams,
} from "~/types/server";

import { deletePageCommentsById } from "./commentUtils";
import { getSiteOrThrowInTransaction } from "./siteUtils";

export async function getPageOrThrowInTransaction(
    t: Transaction,
    uid: string,
    ref: DocumentReference
) {
    const pageSnapshot = await t.get(ref);
    const pageData = pageSnapshot.data() as Page;
    if (!pageSnapshot.exists) throw new CustomApiError("Page does not exist", 404);
    if (uid !== pageData.uid) throw new CustomApiError("Forbidden", 403);
    return pageData;
}

function querySitePagesById(siteId: string) {
    return PAGES_COLLECTION.where("siteId", "==", siteId);
}

/**
 * Gets the information of a page
 *
 * @param uid The id of the owner of the page
 * @param pageId The id of the page
 */
export async function getPageById(uid: string, pageId: string) {
    const pageRef = PAGES_COLLECTION.doc(pageId);
    return await firestoreAdmin.runTransaction(async t => {
        const pageData = await getPageOrThrowInTransaction(t, uid, pageRef);
        return pageData;
    });
}

export async function getClientPageById(uid: string, pageId: string) {
    const pageRef = PAGES_COLLECTION.doc(pageId);
    return await firestoreAdmin.runTransaction(async t => {
        const pageData = await getPageOrThrowInTransaction(t, uid, pageRef);
        const { docs } = await t.get(COMMENTS_COLLECTION.where("pageId", "==", pageId));
        /**
         * Should the user see the raw comment?
         */
        const comments = (docs.map(doc => doc.data()) as Comment[]).sort(
            (c1, c2) => c2.date - c1.date
        );
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
export async function createPage(uid: string, data: CreatePageBodyParams) {
    try {
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
            const siteData = await getSiteOrThrowInTransaction(t, uid, siteRef);

            if (!url.includes(siteData.domain) && siteData.domain !== "*")
                throw new CustomApiError("Site domain and page url do not match", 409);

            // Increment the pageCount of the site by 1
            t.update(siteRef, { pageCount: FieldValue.increment(1) });
            t.create(pageRef, newPage);
            return newPage;
        });
    } catch (err) {
        handleFirestoreError(err);
    }
}

/**
 * Updates a page with the given id.
 *
 * @param uid The id of the owner of the page
 * @param pageId The id of the page
 * @param data The data to update the page
 */
export async function updatePageById(uid: string, pageId: string, data: UpdatePageBodyParams) {
    try {
        const pageRef = PAGES_COLLECTION.doc(pageId);
        return await firestoreAdmin.runTransaction(async t => {
            await getPageOrThrowInTransaction(t, uid, pageRef);
            t.update(pageRef, data);
        });
    } catch (err) {
        handleFirestoreError(err);
    }
}

export async function deletePageById(uid: string, pageId: string) {
    try {
        const pageRef = PAGES_COLLECTION.doc(pageId);
        return await firestoreAdmin.runTransaction(async t => {
            const pageData = await getPageOrThrowInTransaction(t, uid, pageRef);
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
    } catch (err) {
        handleFirestoreError(err);
    }
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
            ...pageIds.map(id => deletePageCommentsById(id)), // And their comments
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
