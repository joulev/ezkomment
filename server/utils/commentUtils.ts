import { firestoreAdmin } from "~/server/firebase/firebaseAdmin";

import { CreateCommentRequest, UpdateCommentBodyParams } from "~/types/server";

import { deleteQuery } from "./firestoreUtils";

const COMMENTS_COLLECTION = firestoreAdmin.collection("comments");

/**
 * Creates a new comment for a particular page.
 * @param data The data of the comment
 */
export async function createComment(data: CreateCommentRequest) {
    const commentRef = COMMENTS_COLLECTION.doc();
    return await commentRef.create({ id: commentRef.id, ...data });
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
