import { Timestamp } from "firebase-admin/firestore";

import { firestoreAdmin } from "~/server/firebase/firebaseAdmin";
import CustomApiError from "~/server/utils/errors/customApiError";
import { handleFirestoreError } from "~/server/utils/errors/handleFirestoreError";
import { deleteQuery } from "~/server/utils/firestoreUtils";

import { Comment, CreateCommentRequest, Page, UpdateCommentBodyParams } from "~/types/server";

const COMMENTS_COLLECTION = firestoreAdmin.collection("comments");
const PAGES_COLLECTION = firestoreAdmin.collection("pages");

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
            const pageSnapshot = await t.get(PAGES_COLLECTION.doc(pageId));
            if (!pageSnapshot.exists) {
                throw new CustomApiError("Page does not exist", 404);
            }
            const pageData = pageSnapshot.data() as Page;
            const newComment = {
                id: commentId,
                date: Timestamp.now(),
                status: pageData.autoApprove ? "Approved" : "Pending",
                ...data,
            };
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
        const commentRef = COMMENTS_COLLECTION.doc(commentId);
        return await commentRef.update(data);
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
        return await commentRef.delete({ exists: true });
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

export async function importComments(...data: Comment[]) {
    const batch = firestoreAdmin.batch();
    for (const comment of data) {
        const { id } = comment;
        batch.create(COMMENTS_COLLECTION.doc(id), comment);
    }
    await batch.commit();
}
