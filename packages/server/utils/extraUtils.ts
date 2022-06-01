import { Response } from "express";
import { CollectionReference, DocumentData } from "firebase-admin/firestore";

import { firestoreAdmin } from "../lib/firebaseAdmin";

/**
 * A helper function to report bad requests in `catch` blocks.
 *
 * @param res The response to be sent back
 * @param err The error occured
 * @param msg Extra message to be sent back with the response
 */
export function reportBadRequest(res: Response, err: unknown, msg: string) {
    console.error(err);
    res.status(400).json({
        error: `${err}`,
        message: msg,
    });
}

/**
 * Deletes a Firestore collection. The documents are deleted in batches.
 *
 * @param collectionRef The reference to the collection
 * @param batchSize The number of documents to be deleted in each batch
 * @returns A `Promise` that resolves after the collection has been deleted, and rejects otherwise.
 */
export async function deleteCollection(
    collectionRef: CollectionReference<DocumentData>,
    batchSize: number = 10
) {
    const query = collectionRef.limit(batchSize);
    async function deleteQueryBatch(resolve: any) {
        const snapshot = await query.get();
        if (snapshot.empty) {
            resolve();
            return;
        }
        const batch = firestoreAdmin.batch();
        for (const doc of snapshot.docs) {
            batch.delete(doc.ref);
        }
        batch.commit();
        process.nextTick(() => deleteQueryBatch(resolve));
    }
    return new Promise((resolve, reject) => deleteQueryBatch(resolve).catch(reject));
}
