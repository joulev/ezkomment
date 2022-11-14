import { FieldValue, Timestamp } from "firebase-admin/firestore";
import { PAGE } from "~/misc/validate";
import md2html from "~/misc/markdown";
import { firestoreAdmin } from "~/server/firebase/app";
import {
    COMMENTS_COLLECTION,
    PAGES_COLLECTION,
    SITES_COLLECTION,
} from "~/server/firebase/collections";
import CustomApiError from "~/server/errors/custom-api-error";
import { deleteQuery, getDocumentInTransactionWithUid } from "~/server/utils/firestore";
import {
    ClientPage,
    Comment,
    CreatePageBodyParams,
    Page,
    Site,
    UpdateCommentBodyParams,
    UpdatePageBodyParams,
} from "~/types/server";

export async function get(uid: string, pageId: string): Promise<ClientPage> {
    const pageRef = PAGES_COLLECTION.doc(pageId);
    return await firestoreAdmin.runTransaction(async t => {
        const pageData = await getDocumentInTransactionWithUid<Page>(t, pageRef, uid);
        const { docs } = await t.get(COMMENTS_COLLECTION.where("pageId", "==", pageId));
        const rawComments = docs
            .map(doc => doc.data())
            .sort((c1, c2) => c2.date - c1.date) as Comment[];
        const comments = await Promise.all(
            rawComments.map(async ({ text, ...rest }) => ({ text: await md2html(text), ...rest }))
        );
        const clientPageData: ClientPage = { ...pageData, comments };
        return clientPageData;
    });
}

export async function getApprovedCommentsRaw(pageId: string): Promise<Comment[]> {
    const commentSnapshots = await COMMENTS_COLLECTION.where("pageId", "==", pageId)
        .where("status", "==", "Approved")
        .get();
    const data = commentSnapshots.docs.map(doc => doc.data()) as Comment[];
    return data.sort((c1, c2) => c2.date - c1.date);
}

/**
 * Creates a new page.
 *
 * @param uid The id of the owner of the page
 * @param data The data of the page
 */
export async function create(uid: string, data: CreatePageBodyParams) {
    const { siteId, url } = data;
    const pageRef = PAGES_COLLECTION.doc();
    const pageId = pageRef.id;
    const newPage: Page = {
        uid,
        id: pageId,
        ...data,
        totalCommentCount: 0,
        pendingCommentCount: 0,
        lastUpdated: Timestamp.now().toMillis(),
    };
    return await firestoreAdmin.runTransaction(async t => {
        const siteRef = SITES_COLLECTION.doc(siteId);
        const siteData = await getDocumentInTransactionWithUid<Site>(t, siteRef, uid);
        if (!PAGE.urlMatchDomain(url, siteData.domain)) {
            throw new CustomApiError("Site domain and page url do not match", 409);
        }
        // Increment the pageCount of the site by 1
        t.update(siteRef, { pageCount: FieldValue.increment(1) });
        t.create(pageRef, newPage);
        return newPage;
    });
}

/**
 * Updates a page with the given id.
 *
 * @param uid The id of the owner of the page
 * @param pageId The id of the page
 * @param data The data to update the page
 */
export async function update(uid: string, pageId: string, data: UpdatePageBodyParams) {
    /**
     * Approve all pending comments of a page when auto approve is turned on
     *
     * @param pageId The id of the page
     */
    async function approveAllPendingComments(pageId: string) {
        await firestoreAdmin.runTransaction(async t => {
            const commentSnapshots = await t.get(
                COMMENTS_COLLECTION.where("pageId", "==", pageId).where("status", "==", "Pending")
            );
            const commentDocs = commentSnapshots.docs;
            const commentRefs = commentDocs.map(doc => doc.ref);
            const updateData: UpdateCommentBodyParams = { status: "Approved" };
            commentRefs.forEach(ref => t.update(ref, updateData));
        });
    }

    const pageRef = PAGES_COLLECTION.doc(pageId);
    const { autoApprove } = data;
    return await firestoreAdmin.runTransaction(async t => {
        const { siteId, pendingCommentCount } = await getDocumentInTransactionWithUid<Page>(
            t,
            pageRef,
            uid
        );
        /**
         * We need to approve all pending comments when auto approved is turned to true
         * Update the statistic as well
         */
        if (autoApprove) {
            await approveAllPendingComments(pageId);
            t.update(pageRef, { pendingCommentCount: 0 });
            t.update(SITES_COLLECTION.doc(siteId), {
                pendingCommentCount: FieldValue.increment(-pendingCommentCount),
            });
        }
        t.update(pageRef, { ...data, lastUpdated: Timestamp.now().toMillis() });
    });
}

export async function remove(uid: string, pageId: string) {
    const pageRef = PAGES_COLLECTION.doc(pageId);
    return await firestoreAdmin.runTransaction(async t => {
        const pageData = await getDocumentInTransactionWithUid<Page>(t, pageRef, uid);
        const { siteId, totalCommentCount, pendingCommentCount } = pageData;
        const siteRef = SITES_COLLECTION.doc(siteId);
        // Decrease the number of page by 1, decrease the number of total comment count,
        // and pending comment count
        t.update(siteRef, {
            pageCount: FieldValue.increment(-1),
            totalCommentCount: FieldValue.increment(-totalCommentCount),
            pendingCommentCount: FieldValue.increment(-pendingCommentCount),
        });
        t.delete(pageRef);
    });
}

export async function deleteComments(pageId: string) {
    const commentQuery = COMMENTS_COLLECTION.where("pageId", "==", pageId);
    const promises: Promise<unknown>[] = [deleteQuery(commentQuery)];
    await Promise.all(promises);
}
