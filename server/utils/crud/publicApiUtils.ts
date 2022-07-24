import { DocumentReference, FieldValue, Timestamp, Transaction } from "firebase-admin/firestore";

import { firestoreAdmin } from "~/server/firebase/firebaseAdmin";
import {
    COMMENTS_COLLECTION,
    PAGES_COLLECTION,
    SITES_COLLECTION,
} from "~/server/firebase/firestoreCollections";

import { ApprovedStatus, Comment, Page, PublicCreateCommentBodyParams } from "~/types/server";

import CustomApiError from "../errors/customApiError";
import { getDocumentInTransaction } from "../firestoreUtils";

async function getPageInTransactionWithSiteId(
    t: Transaction,
    ref: DocumentReference,
    siteId: string
) {
    const data = await getDocumentInTransaction<Page>(t, ref);
    if (data.siteId !== siteId) throw new CustomApiError("Forbidden, ids do not match", 403);
    return data;
}

export async function publicListPageApprovedComments(siteId: string, pageId: string) {
    return await firestoreAdmin.runTransaction(async t => {
        await getPageInTransactionWithSiteId(t, PAGES_COLLECTION.doc(pageId), siteId);
        const commentSnapshots = await t.get(
            COMMENTS_COLLECTION.where("pageId", "==", pageId).where("status", "==", "Approved")
        );
        const data = commentSnapshots.docs.map(doc => doc.data()) as Comment[];
        return data.sort((c1, c2) => c2.date - c1.date);
    });
}

export async function publicCreateComment(
    siteId: string,
    pageId: string,
    data: PublicCreateCommentBodyParams
) {
    const commentRef = COMMENTS_COLLECTION.doc();
    const commentId = commentRef.id;
    const siteRef = SITES_COLLECTION.doc(siteId);
    const pageRef = PAGES_COLLECTION.doc(pageId);
    return await firestoreAdmin.runTransaction(async t => {
        const { autoApprove } = await getPageInTransactionWithSiteId(t, pageRef, siteId);
        const newComment: Comment = {
            id: commentId,
            date: Timestamp.now().toMillis(),
            status: autoApprove ? "Approved" : ("Pending" as ApprovedStatus),
            pageId,
            siteId, // I will save a reference to the site for easier update
            ...data,
        };
        // update information about total number of comment.
        const incrementByOne = FieldValue.increment(1);
        const updateCommentCount: any = { totalCommentCount: incrementByOne };
        if (!autoApprove) updateCommentCount.pendingCommentCount = incrementByOne;

        // update
        t.update(siteRef, updateCommentCount);
        t.update(pageRef, updateCommentCount);
        t.create(commentRef, newComment);
        return newComment;
    });
}
