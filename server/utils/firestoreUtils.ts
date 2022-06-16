import {
    CollectionReference,
    DocumentData,
    DocumentReference,
    Query,
} from "firebase-admin/firestore";

import { firestoreAdmin } from "~/server/firebase/firebaseAdmin";

/**
 * Deletes a Firestore collection. The documents are deleted in batches.
 *
 * @param collectionRef The reference to the collection
 */
export async function deleteCollection(collectionRef: CollectionReference<DocumentData>) {
    return await deleteQueryBatch(collectionRef);
}

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
