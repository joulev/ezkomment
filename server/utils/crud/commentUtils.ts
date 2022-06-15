import { FieldValue } from "firebase-admin/firestore";

import { firestoreAdmin } from "~/server/firebase/firebaseAdmin";

import {
    ApprovedStatus,
    CreateCommentRequest,
    Page,
    UpdateCommentBodyParams,
} from "~/types/server";

import CustomApiError from "../errors/customApiError";
import { deleteQuery } from "../firestoreUtils";

const COMMENTS_COLLECTION = firestoreAdmin.collection("comments");
const PAGES_COLLECTION = firestoreAdmin.collection("pages");

/**
 * Creates a new comment for a particular page.
 * @param data The data of the comment
 */
export async function createComment(data: CreateCommentRequest) {
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
            date: FieldValue.serverTimestamp(),
            status: pageData.autoApprove ? "Approved" : "Pending",
            ...data,
        };
        t.create(commentRef, newComment);
        return newComment;
    });
}

/**
 * Updates a comment (current, only approved status can be updated).
 *
 * @param commentId The comment's id
 * @param data The new data
 * @returns The result of the updating action.
 */
export async function updateCommentById(commentId: string, data: UpdateCommentBodyParams) {
    return await COMMENTS_COLLECTION.doc(commentId).update(data);
}

/**
 * Delete a particular comment
 * @param pageId The page's id
 * @param commentId The comment's id
 */
export async function deleteCommentById(commentId: string) {
    return await COMMENTS_COLLECTION.doc(commentId).delete();
}

export async function listPageCommentsById(pageId: string) {
    const commentSnapshot = await COMMENTS_COLLECTION.where("pageId", "==", pageId).get();
    return commentSnapshot.docs.map(doc => doc.data());
}

export async function deletePageCommentsById(pageId: string) {
    const commentQuery = COMMENTS_COLLECTION.where("pageId", "==", pageId);
    return await deleteQuery(commentQuery);
}
