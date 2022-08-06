import { firestoreAdmin } from "~/server/firebase/firebaseAdmin";
import { USERS_COLLECTION } from "~/server/firebase/firestoreCollections";

import { Notification } from "~/types/server";

import { handleFirestoreError } from "../errors/handleFirestoreError";

export async function deleteNotificationWithUid(uid: string, notificationId: string) {
    const notificationRef = USERS_COLLECTION.doc(uid)
        .collection("notification")
        .doc(notificationId);
    await firestoreAdmin
        .runTransaction(async t => {
            t.delete(notificationRef, { exists: true });
        })
        .catch(handleFirestoreError);
}

export async function deleteUserNotifications(uid: string) {
    const userNotificationsRef = USERS_COLLECTION.doc(uid).collection("notification");
    await firestoreAdmin.recursiveDelete(userNotificationsRef);
}

export async function listUserNotifications(uid: string) {
    const notificationSnapshots = await USERS_COLLECTION.doc(uid).collection("notification").get();
    const data = notificationSnapshots.docs.map(doc => doc.data()) as Notification[];
    return data.sort((c1, c2) => c2.timestamp - c1.timestamp);
}
