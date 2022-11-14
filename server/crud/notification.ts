import { firestoreAdmin } from "~/server/firebase/app";
import { USERS_COLLECTION } from "~/server/firebase/collections";
import { handleFirestoreError } from "~/server/errors/firestore-error";
import { Notification } from "~/types/server";

export async function get(uid: string): Promise<Notification[]> {
    const notificationSnapshots = await USERS_COLLECTION.doc(uid).collection("notification").get();
    const data = notificationSnapshots.docs.map(doc => doc.data()) as Notification[];
    return data.sort((c1, c2) => c2.timestamp - c1.timestamp);
}

export async function deleteById(uid: string, id: string) {
    const notificationRef = USERS_COLLECTION.doc(uid).collection("notification").doc(id);
    await notificationRef.delete({ exists: true }).catch(handleFirestoreError);
}

export async function deleteAll(uid: string) {
    const userNotificationsRef = USERS_COLLECTION.doc(uid).collection("notification");
    await firestoreAdmin.recursiveDelete(userNotificationsRef);
}
