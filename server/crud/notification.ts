import { firestoreAdmin } from "~/server/firebase/app";
import { USERS_COLLECTION } from "~/server/firebase/collections";

export async function deleteById(uid: string, id: string) {
    const notificationRef = USERS_COLLECTION.doc(uid).collection("notification").doc(id);
    await notificationRef.delete({ exists: true });
}

export async function deleteAll(uid: string) {
    const userNotificationsRef = USERS_COLLECTION.doc(uid).collection("notification");
    await firestoreAdmin.recursiveDelete(userNotificationsRef);
}
