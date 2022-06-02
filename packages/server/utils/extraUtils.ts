import { Request, Response } from "express";
import { CollectionReference, DocumentData, Query } from "firebase-admin/firestore";
import { NextApiRequest, NextApiResponse } from "next";

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
    await batch.commit(); // should get rid of await?
    process.nextTick(() => deleteQueryBatch(query));
}

export function castNextToExpress(req: NextApiRequest, res: NextApiResponse): [Request, Response] {
    // may lost type information
    const expressReq = <Request> <unknown> req;
    const expressRes = <Response> <unknown> res;
    expressReq.params = { ...<any> req.query };
    return [expressReq, expressRes];
}
