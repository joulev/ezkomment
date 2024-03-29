import { DocumentData, DocumentReference, Query, Transaction } from "firebase-admin/firestore";
import { firestoreAdmin } from "~/server/firebase/app";
import CustomApiError from "~/server/errors/custom-api-error";

/**
 * Deletes all documents returned from a query.
 *
 * @param query The query
 */

export async function deleteQuery(query: Query<DocumentData>) {
    const snapshot = await query.get();
    if (snapshot.empty) return;
    await deleteRefArray(snapshot.docs.map(doc => doc.ref));
}

export async function deleteRefArray(refs: DocumentReference[]) {
    if (!refs.length) return;
    const batch = firestoreAdmin.batch();
    refs.forEach(ref => batch.delete(ref));
    await batch.commit();
}

export async function getDocumentInTransaction<T = any>(t: Transaction, ref: DocumentReference) {
    const snapshot = await t.get(ref);
    const data = snapshot.data() as T;
    if (!snapshot.exists) throw new CustomApiError("Document does not exist", 404);
    return data;
}

export async function getDocumentInTransactionWithUid<T extends { uid: string } = any>(
    t: Transaction,
    ref: DocumentReference,
    uid: string
) {
    const data: T = await getDocumentInTransaction<T>(t, ref);
    if (data.uid !== uid) throw new CustomApiError("Forbidden, ids do not match", 403);
    return data;
}
