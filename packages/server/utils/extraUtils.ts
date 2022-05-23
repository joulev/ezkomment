import { Response } from "express";

import { firestoreAdmin } from "../lib/firebaseAdmin";

export function reportBadRequest(res: Response, err: unknown, msg: string) {
    console.error(err);
    res.status(400).json({
        error: `${err}`,
        message: msg,
    });
}

export async function deleteCollection(
    collectionRef: FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>,
    fieldName: string,
    batchSize: number
) {
    const query = collectionRef.orderBy(fieldName).limit(batchSize);
    async function deleteQueryBatch(resolve: any) {
        // resolve :: callback
        const snapshot = await query.get();
        if (snapshot.size === 0) {
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
