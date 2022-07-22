import { Timestamp } from "firebase-admin/firestore";

import { firestoreAdmin } from "~/server/firebase/firebaseAdmin";
import { SITES_COLLECTION } from "~/server/firebase/firestoreCollections";

import { Site, SiteStatistics } from "~/types/server";

import { getDocumentInTransactionWithUid } from "../firestoreUtils";
import { listSiteComments } from "./siteUtils";

const MILLIS_PER_DAY = 1000 * 60 * 60 * 24;

export async function getSiteStatistic(uid: string, siteId: string) {
    const siteRef = SITES_COLLECTION.doc(siteId);
    return await firestoreAdmin.runTransaction(async t => {
        // Security
        if (process.env.NODE_ENV !== "development") {
            await getDocumentInTransactionWithUid<Site>(t, siteRef, uid);
        }
        const siteComments = await listSiteComments(siteId);
        const currentTimestamp = Timestamp.now().toMillis();
        const totalComment: number[] = Array.from({ length: 30 }, _ => 0);
        const newComment: number[] = Array.from({ length: 30 }, _ => 0);

        let totalCount = 0;
        let newCount = 0;
        let daysAgo = 29;

        for (let i = siteComments.length - 1; i >= 0; i--) {
            const { date } = siteComments[i];
            // convert to integer
            const commentDaysAgo = Math.round((currentTimestamp - date) / MILLIS_PER_DAY);
            if (commentDaysAgo < daysAgo) {
                newComment[daysAgo] = newCount;
                newCount = 0;
                while (daysAgo > commentDaysAgo) {
                    totalComment[daysAgo] = totalCount;
                    daysAgo--;
                }
                // after this loop, daysAgo should be equal to commentDaysAgo
            }
            totalCount++;
            newCount++;
        }
        newComment[daysAgo] = newCount;
        for (; daysAgo >= 0; daysAgo--) totalComment[daysAgo] = totalCount;
        const statistic: SiteStatistics = { totalComment, newComment };
        return statistic;
    });
}
