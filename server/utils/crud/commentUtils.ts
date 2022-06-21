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
    CreateCommentRequest,
    Page,
    UpdateCommentBodyParams,
} from "~/types/server";

/**
 * Creates a new comment for a particular page.
 * @param data The data of the comment
 */
export async function createComment(data: CreateCommentRequest) {
    try {
        const { pageId } = data;
        const commentRef = COMMENTS_COLLECTION.doc();
        const commentId = commentRef.id;
        return await firestoreAdmin.runTransaction(async t => {
            const pageRef = PAGES_COLLECTION.doc(pageId);
            const pageSnapshot = await t.get(pageRef);
            if (!pageSnapshot.exists) {
                throw new CustomApiError("Page does not exist", 404);
            }
            const pageData = pageSnapshot.data() as Page;
            const newComment = {
                id: commentId,
                date: Timestamp.now(),
                status: pageData.autoApprove ? "Approved" : ("Pending" as ApprovedStatus),
                siteId: pageData.siteId, // I will save a reference to the site for easier update
                ...data,
            };
            const incrementByOne = FieldValue.increment(1);
            // Update the number of pending comment
            if (!pageData.autoApprove) {
                t.update(pageRef, { totalCommentCount: incrementByOne });
            }
            // Update the number of total comment
            t.update(pageRef, { totalCommentCount: incrementByOne });
            t.create(commentRef, newComment);
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
        const { status } = data;
        const commentRef = COMMENTS_COLLECTION.doc(commentId);
        return await firestoreAdmin.runTransaction(async t => {
            const commentSnapshot = await commentRef.get();
            if (!commentSnapshot.exists) {
                throw new CustomApiError("Comment does not exist", 404);
            }
            const commentData = commentSnapshot.data() as Comment;
            // Because of the sanitizer, the only legit status is "Approved"
            if (status === commentData.status) {
                throw new CustomApiError("Comment is already approved", 409);
            }
            // We shall decrement the value of pendingCommentCount
            const pageRef = PAGES_COLLECTION.doc(commentData.pageId);
            const decrementByOne = FieldValue.increment(-1);
            t.update(pageRef, { pendingCommentCount: decrementByOne });
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
            if (!commentSnapshot.exists) {
                throw new CustomApiError("Comment does not exist", 404);
            }
            const commentData = commentSnapshot.data() as Comment;
            const pageRef = PAGES_COLLECTION.doc(commentData.pageId);
            const decrementByOne = FieldValue.increment(-1);
            // Should not use any here, but I am lazy right now
            const updatePageContent: any = { totalCommentCount: decrementByOne };
            if (commentData.status === "Pending") {
                updatePageContent.pendingCommentCount = decrementByOne;
            }
            t.update(pageRef, updatePageContent);
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
    try {
        const commentSnapshots = await COMMENTS_COLLECTION.where("pageId", "==", pageId).get();
        return commentSnapshots.docs.map(doc => doc.data());
    } catch (err) {
        handleFirestoreError(err);
    }
}

export async function deletePageCommentsById(pageId: string) {
    try {
        const commentQuery = COMMENTS_COLLECTION.where("pageId", "==", pageId);
        return await deleteQuery(commentQuery);
    } catch (err) {
        handleFirestoreError(err);
    }
}
