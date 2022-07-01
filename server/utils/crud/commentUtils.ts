import { FieldValue, Timestamp } from "firebase-admin/firestore";

import { firestoreAdmin } from "~/server/firebase/firebaseAdmin";
import {
    COMMENTS_COLLECTION,
    PAGES_COLLECTION,
    SITES_COLLECTION,
} from "~/server/firebase/firestoreCollections";
import CustomApiError from "~/server/utils/errors/customApiError";
import { handleFirestoreError } from "~/server/utils/errors/handleFirestoreError";
import { deleteQuery } from "~/server/utils/firestoreUtils";

import {
    ApprovedStatus,
    Comment,
    CreateCommentBodyParams,
    Page,
    UpdateCommentBodyParams,
} from "~/types/server";

/**
 * Creates a new comment for a particular page.
 * @param data The data of the comment
 */
export async function createComment(data: CreateCommentBodyParams) {
    try {
        const { pageId } = data;
        const commentRef = COMMENTS_COLLECTION.doc();
        const commentId = commentRef.id;
        return await firestoreAdmin.runTransaction(async t => {
            const pageRef = PAGES_COLLECTION.doc(pageId);
            const pageSnapshot = await t.get(pageRef);
            const pageData = pageSnapshot.data() as Page;

            if (!pageSnapshot.exists) throw new CustomApiError("Page does not exist", 404);

            const siteRef = SITES_COLLECTION.doc(pageData.siteId);
            const newComment: Comment = {
                id: commentId,
                date: Timestamp.now().toMillis(),
                status: pageData.autoApprove ? "Approved" : ("Pending" as ApprovedStatus),
                siteId: pageData.siteId, // I will save a reference to the site for easier update
                ...data,
            };
            // update information about total number of comment.
            const incrementByOne = FieldValue.increment(1);
            const updateCommentCount: any = { totalCommentCount: incrementByOne };
            if (!pageData.autoApprove) updateCommentCount.pendingCommentCount = incrementByOne;
            t.update(siteRef, updateCommentCount);
            t.update(pageRef, updateCommentCount);
            t.create(commentRef, newComment);
            console.dir(newComment, { depth: null });
            return newComment;
        });
    } catch (err) {
        handleFirestoreError(err);
    }
}

/**
 * Updates a comment (current, only approved status can be updated).
 *
 * @param commentId The comment's id
 * @param data The new data
 * @returns The result of the updating action.
 */
export async function updateCommentById(commentId: string, data: UpdateCommentBodyParams) {
    try {
        const commentRef = COMMENTS_COLLECTION.doc(commentId);
        return await firestoreAdmin.runTransaction(async t => {
            const commentSnapshot = await commentRef.get();
            const commentData = commentSnapshot.data() as Comment;

            if (!commentSnapshot.exists) throw new CustomApiError("Comment does not exist", 404);
            if (commentData.status === "Approved")
                throw new CustomApiError("Comment is already approved", 409);
            // Because of the sanitizer, the only legit status is "Approved"
            // We shall decrement the value of pendingCommentCount
            const pageRef = PAGES_COLLECTION.doc(commentData.pageId);
            const siteRef = SITES_COLLECTION.doc(commentData.siteId);
            const decrementByOne = FieldValue.increment(-1);
            t.update(pageRef, { pendingCommentCount: decrementByOne });
            t.update(siteRef, { pendingCommentCount: decrementByOne });
            t.update(commentRef, data);
        });
    } catch (err) {
        handleFirestoreError(err);
    }
}

/**
 * Delete a particular comment
 * @param pageId The page's id
 * @param commentId The comment's id
 */
export async function deleteCommentById(commentId: string) {
    try {
        const commentRef = COMMENTS_COLLECTION.doc(commentId);
        return await firestoreAdmin.runTransaction(async t => {
            const commentSnapshot = await commentRef.get();
            const commentData = commentSnapshot.data() as Comment;

            if (!commentSnapshot.exists) throw new CustomApiError("Comment does not exist", 404);

            const pageRef = PAGES_COLLECTION.doc(commentData.pageId);
            const siteRef = SITES_COLLECTION.doc(commentData.siteId);

            const decrementByOne = FieldValue.increment(-1);
            // Should not use any here, but I am lazy right now
            const updateCommentCount: any = { totalCommentCount: decrementByOne };
            if (commentData.status === "Pending")
                updateCommentCount.pendingCommentCount = decrementByOne;
            t.update(siteRef, updateCommentCount);
            t.update(pageRef, updateCommentCount);
            t.delete(commentRef);
        });
    } catch (err) {
        handleFirestoreError(err);
    }
}

/////////////////////////
// Interact with pages //
/////////////////////////

export async function listPageCommentsById(pageId: string) {
    const commentSnapshots = await COMMENTS_COLLECTION.where("pageId", "==", pageId).get();
    const data = commentSnapshots.docs.map(doc => doc.data()) as Comment[];
    return data.sort((c1, c2) => c2.date - c1.date);
}

/**
 * We will need to update the comment count of the page, if we delete all comments.
 * But this may be redudant in some case, for example if we want to delete all pages of a site.
 *
 * @param pageId The page's id
 * @param update If true, the page and site will be updated. Default to false
 */
export async function deletePageCommentsById(pageId: string, update: boolean = false) {
    try {
        const commentQuery = COMMENTS_COLLECTION.where("pageId", "==", pageId);
        const promises: Promise<any>[] = [deleteQuery(commentQuery)];
        if (update) {
            // The update could fail here, if the page does not exist.
            promises.push(
                firestoreAdmin.runTransaction(async t => {
                    const pageRef = PAGES_COLLECTION.doc(pageId);
                    const pageSnapshot = await t.get(pageRef);
                    const pageData = pageSnapshot.data() as Page;

                    if (!pageSnapshot.exists) throw new CustomApiError("Page does not exist", 404);

                    const { siteId, totalCommentCount, pendingCommentCount } = pageData;
                    const siteRef = SITES_COLLECTION.doc(siteId);

                    const updateContent = {
                        totalCommentCount: FieldValue.increment(-totalCommentCount),
                        pendingCommentCount: FieldValue.increment(-pendingCommentCount),
                    };

                    t.update(siteRef, updateContent);
                    t.update(pageRef, updateContent);
                })
            );
        }
        return await Promise.all(promises);
    } catch (err) {
        handleFirestoreError(err);
    }
}
