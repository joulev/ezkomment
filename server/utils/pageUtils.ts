import { firestoreAdmin } from "~/server/firebase/firebaseAdmin";

import {
    Comment,
    CreateCommentRequest,
    CreatePageRequest,
    UpdateCommentRequest,
    UpdatePageBodyParams,
} from "~/types/server";

import { deleteCollection } from "./firestoreUtils";

const PAGES_COLLECTION = firestoreAdmin.collection("pages");

/**
 * Gets the reference to the comment subcollection of a page.
 *
 * @param pageId The page's id
 * @returns The reference to the `comments` subcollection.
 */
function getCommentsCollection(pageId: string) {
    return PAGES_COLLECTION.doc(pageId).collection("comments");
}

///////////
// PAGES //
///////////

export async function getPageById(pageId: string) {
    const result = await PAGES_COLLECTION.doc(pageId).get();
    if (!result.exists) {
        throw Error("No such page!");
    }
    return result.data();
}

export async function createPage(data: CreatePageRequest) {
    const pageRef = PAGES_COLLECTION.doc();
    return await pageRef.create({ id: pageRef.id, ...data });
}

export async function updatePageById(pageId: string, data: UpdatePageBodyParams) {
    return await PAGES_COLLECTION.doc(pageId).update(data);
}

export async function deletePageById(pageId: string) {
    return await PAGES_COLLECTION.doc(pageId).delete();
}

// BELOW FUNCTIONS ARE TO BE REDESIGNED

//////////////
// COMMENTS //
//////////////

/**
 * Creates a new comment for a particular page.
 * @param pageId The page's id
 * @param data The data of the comment
 */
export async function createPageComment(pageId: string, data: CreateCommentRequest) {
    const commentRef = getCommentsCollection(pageId).doc();
    return await commentRef.create({ id: commentRef.id, ...data });
}

export async function updatePageCommentById(
    pageId: string,
    commentId: string,
    data: UpdateCommentRequest
) {
    return await getCommentsCollection(pageId).doc(commentId).update(data);
}

/**
 * Delete a particular comment
 * @param pageId The page's id
 * @param commentId The comment's id
 */
export async function deletePageCommentById(pageId: string, commentId: string) {
    return await getCommentsCollection(pageId).doc(commentId).delete();
}
