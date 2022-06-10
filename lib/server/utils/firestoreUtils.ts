import { CollectionReference, DocumentData, Query } from "firebase-admin/firestore";

import { firestoreAdmin } from "@server/firebase/firebaseAdmin";

/**
 * Deletes a Firestore collection. The documents are deleted in batches.
 *
 * @param collectionRef The reference to the collection
 * @param batchSize The number of documents to be deleted in each batch
 */
export async function deleteCollection(
    collectionRef: CollectionReference<DocumentData>,
    batchSize: number = 10
) {
    await deleteQueryBatch(collectionRef.limit(batchSize));
}

/**
 * Deletes all documents returned from a query.
 *
 * @param query The query
 * @param batchSize The number of documents to be deleted in each batch
 */

export async function deleteQuery(query: Query<DocumentData>, batchSize = 10) {
    await deleteQueryBatch(query.limit(batchSize));
}

async function deleteQueryBatch(query: Query<DocumentData>) {
    const snapshot = await query.get();
    if (snapshot.empty) {
        return;
    }
    const batch = firestoreAdmin.batch();
    for (const doc of snapshot.docs) {
        batch.delete(doc.ref);
    }
    await batch.commit();
    process.nextTick(() => deleteQueryBatch(query));
}
