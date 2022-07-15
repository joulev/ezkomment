import { DocumentData, DocumentReference, Query, Transaction } from "firebase-admin/firestore";

import { firestoreAdmin } from "~/server/firebase/firebaseAdmin";
import CustomApiError from "~/server/utils/errors/customApiError";

import { Page, Site } from "~/types/server";

/**
 * Deletes all documents returned from a query.
 *
 * @param query The query
 */

export async function deleteQuery(query: Query<DocumentData>) {
    return await deleteQueryBatch(query);
}

async function deleteQueryBatch(query: Query<DocumentData>) {
    const snapshot = await query.get();
    if (snapshot.empty) return [];
    const batch = firestoreAdmin.batch();
    snapshot.docs.forEach(doc => batch.delete(doc.ref));
    return await batch.commit();
}

export async function deleteRefArray(refs: DocumentReference[]) {
    const batch = firestoreAdmin.batch();
    refs.forEach(ref => batch.delete(ref));
    return await batch.commit();
}

export async function getInTransaction<T = any>(t: Transaction, ref: DocumentReference) {
    const snapshot = await t.get(ref);
    const data = snapshot.data() as T;
    if (!snapshot.exists) throw new CustomApiError("Document does not exist", 404);
    return data;
}

export async function getInTransactionWithUid<T = any>(
    t: Transaction,
    ref: DocumentReference,
    uid: string
) {
    const data: T = await getInTransaction<T>(t, ref);
    if ((data as any).uid !== uid) throw new CustomApiError("Forbidden, uids do not match", 403);
    return data;
}

export async function getSiteInTransaction(t: Transaction, ref: DocumentReference, uid: string) {
    return await getInTransactionWithUid<Site>(t, ref, uid);
}

export async function getPageInTransaction(t: Transaction, ref: DocumentReference, uid: string) {
    return await getInTransactionWithUid<Page>(t, ref, uid);
}
