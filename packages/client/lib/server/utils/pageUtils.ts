import {
    Comment,
    CreateCommentRequest,
    CreatePageRequest,
    UpdateCommentRequest,
    UpdatePageRequest,
} from "@server/types";

import { firestoreAdmin } from "@server/firebase/firebaseAdmin";
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
    // Get all comment in the page as well.
    const comments: Comment[] = <Comment[]> await getCommentsCollection(pageId)
        .get()
        .then(query => query.docs.map(doc => doc.data()));
    return {
        ...result,
        approvedComments: comments.filter(c => c.status === "Approved"),
        pendingApprovedComments: comments.filter(c => c.status === "Pending"),
    };
}

export async function createPage(data: CreatePageRequest) {
    const pageRef = data.id ? PAGES_COLLECTION.doc(data.id) : PAGES_COLLECTION.doc();
    return await pageRef.create({ id: pageRef.id, ...data });
}

export async function updatePageById(pageId: string, data: UpdatePageRequest) {
    return await PAGES_COLLECTION.doc(pageId).update(data);
}

export async function deletePageById(pageId: string) {
    const pageRef = PAGES_COLLECTION.doc(pageId);
    await deleteCollection(getCommentsCollection(pageId));
    return await pageRef.delete();
}

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
