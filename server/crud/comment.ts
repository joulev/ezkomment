import { FieldValue, Timestamp } from "firebase-admin/firestore";
import { firestoreAdmin } from "~/server/firebase/app";
import {
    COMMENTS_COLLECTION,
    PAGES_COLLECTION,
    SITES_COLLECTION,
    USERS_COLLECTION,
} from "~/server/firebase/collections";
import CustomApiError from "~/server/errors/custom-api-error";
import { getDocumentInTransaction } from "~/server/utils/firestore";
import {
    ApprovedStatus,
    Comment,
    CreateCommentBodyParams,
    NewCommentNotification,
    Page,
    Site,
    UpdateCommentBodyParams,
} from "~/types/server";

/**
 * Creates a new comment for a particular page.
 *
 * @param data The data of the comment
 */
export async function create(data: CreateCommentBodyParams) {
    const { pageId, author } = data;
    const commentRef = COMMENTS_COLLECTION.doc();
    const commentId = commentRef.id;
    const pageRef = PAGES_COLLECTION.doc(pageId);
    return await firestoreAdmin.runTransaction(async t => {
        const pageData = await getDocumentInTransaction<Page>(t, pageRef);
        const siteRef = SITES_COLLECTION.doc(pageData.siteId);
        const curTimestamp = Timestamp.now().toMillis();
        const newComment: Comment = {
            id: commentId,
            date: curTimestamp,
            status: pageData.autoApprove ? "Approved" : ("Pending" as ApprovedStatus),
            siteId: pageData.siteId, // I will save a reference to the site for easier update
            ...data,
        };
        // update notification
        const notificationRef = USERS_COLLECTION.doc(pageData.uid)
            .collection("notification")
            .doc(pageId);
        const notificationSnapshot = await notificationRef.get();
        if (!notificationSnapshot.exists) {
            const { name: siteName } = await getDocumentInTransaction<Site>(t, siteRef);
            const notification: NewCommentNotification = {
                id: pageId,
                type: "NewComment",
                href: `/app/site/${siteName}/${pageId}`,
                siteName,
                pageTitle: pageData.title,
                authors: [author],
                timestamp: curTimestamp,
            };
            t.create(notificationRef, notification);
        } else {
            t.update(notificationRef, {
                authors: FieldValue.arrayUnion(author),
                timestamp: curTimestamp,
            });
        }
        // update information about total number of comment.
        const incrementByOne = FieldValue.increment(1);
        const updateCommentCount: any = { totalCommentCount: incrementByOne };
        if (!pageData.autoApprove) updateCommentCount.pendingCommentCount = incrementByOne;
        // update
        t.update(siteRef, updateCommentCount);
        t.update(pageRef, updateCommentCount);
        t.create(commentRef, newComment);
        return newComment;
    });
}

/**
 * Updates a comment (only approved status can be updated).
 *
 * @param commentId The comment's id
 * @param data The new data
 */
export async function update(commentId: string, data: UpdateCommentBodyParams) {
    const commentRef = COMMENTS_COLLECTION.doc(commentId);
    await firestoreAdmin.runTransaction(async t => {
        const commentData = await getDocumentInTransaction<Comment>(t, commentRef);
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
}

/**
 * Deletes a comment.
 *
 * @param commentId The comment's id
 */
export async function remove(commentId: string) {
    const commentRef = COMMENTS_COLLECTION.doc(commentId);
    await firestoreAdmin.runTransaction(async t => {
        const commentData = await getDocumentInTransaction<Comment>(t, commentRef);
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
}
