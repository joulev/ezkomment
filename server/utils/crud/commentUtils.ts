import { FieldValue, Timestamp } from "firebase-admin/firestore";

import { firestoreAdmin } from "~/server/firebase/firebaseAdmin";
import {
    COMMENTS_COLLECTION,
    PAGES_COLLECTION,
    SITES_COLLECTION,
} from "~/server/firebase/firestoreCollections";
import CustomApiError from "~/server/utils/errors/customApiError";
import { getDocumentInTransaction } from "~/server/utils/firestoreUtils";

import {
    ApprovedStatus,
    Comment,
    CreateCommentBodyParams,
    Page,
    UpdateCommentBodyParams,
} from "~/types/server";

/**
 * update information about total the number of comment during this day
 */
// const siteLast30DaysStatisticRef = siteRef.collection("statistic").doc("LAST_30_DAYS");
// const siteLast30DaysStatisticData = (
//     await t.get(siteLast30DaysStatisticRef)
// ).data() ?? {
//     date: null,
//     totalComment: 0,
//     newComment: 0,
// };
// const dateToday = new Date().toLocaleDateString("en-CA");
// const siteTodayStatisticRef = siteLast30DaysStatisticRef
//     .collection("last-30-days")
//     .doc(dateToday);

// const todayStatistic = {
//     date: dateToday,
//     totalComment: siteLast30DaysStatisticData.totalComment + 1,
//     newComment:
//         siteLast30DaysStatisticData.date === dateToday
//             ? siteLast30DaysStatisticData.newComment + 1
//             : 1,
// };
// t.set(siteTodayStatisticRef, todayStatistic, { merge: true });
// t.set(siteLast30DaysStatisticRef, todayStatistic, { merge: true });
/**
 * Need to be fixed. Broken at the moment
 */

/**
 * Creates a new comment for a particular page.
 *
 * @param data The data of the comment
 */
export async function createComment(data: CreateCommentBodyParams) {
    const { pageId } = data;
    const commentRef = COMMENTS_COLLECTION.doc();
    const commentId = commentRef.id;
    const pageRef = PAGES_COLLECTION.doc(pageId);
    return await firestoreAdmin.runTransaction(async t => {
        const pageData = await getDocumentInTransaction<Page>(t, pageRef);
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
export async function updateComment(commentId: string, data: UpdateCommentBodyParams) {
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
export async function deleteComment(commentId: string) {
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
