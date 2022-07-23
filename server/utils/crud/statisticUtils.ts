import { Timestamp } from "firebase-admin/firestore";

import { firestoreAdmin } from "~/server/firebase/firebaseAdmin";
import { SITES_COLLECTION } from "~/server/firebase/firestoreCollections";

import { Site, SiteStatistics } from "~/types/server";

import { getDocumentInTransactionWithUid } from "../firestoreUtils";
import { listSiteComments } from "./siteUtils";

const MILLIS_PER_DAY = 1000 * 60 * 60 * 24;

export async function getSiteStatistic(uid: string, siteId: string) {
    const toUTCMidnight = (timestamp: number) => timestamp - (timestamp % MILLIS_PER_DAY);

    const siteRef = SITES_COLLECTION.doc(siteId);
    return await firestoreAdmin.runTransaction(async t => {
        if (process.env.NODE_ENV !== "development") {
            await getDocumentInTransactionWithUid<Site>(t, siteRef, uid);
        }
        const siteComments = await listSiteComments(siteId);
        const curTimestamp = toUTCMidnight(Timestamp.now().toMillis());
        const totalComment: number[] = Array.from({ length: 30 }, _ => 0);
        const newComment: number[] = Array.from({ length: 30 }, _ => 0);
        const finalIndex = siteComments.length - 1;

        let oldCount = 0; // previous value of curCount
        let curCount: number; // how many comments have we traversed through
        let daysAgo = 29;

        for (let i = finalIndex; i >= 0; i--) {
            const { date } = siteComments[i];
            const commentDaysAgo = ((curTimestamp - toUTCMidnight(date)) / MILLIS_PER_DAY) | 0;
            if (commentDaysAgo < daysAgo) {
                curCount = finalIndex - i;
                newComment[daysAgo] = curCount - oldCount;
                while (daysAgo > commentDaysAgo) {
                    totalComment[daysAgo] = curCount;
                    daysAgo--;
                }
                oldCount = curCount;
            }
        }
        curCount = siteComments.length;
        newComment[daysAgo] = curCount - oldCount;
        for (; daysAgo >= 0; daysAgo--) totalComment[daysAgo] = curCount;

        const statistic: SiteStatistics = { totalComment, newComment };
        return statistic;
    });
}
