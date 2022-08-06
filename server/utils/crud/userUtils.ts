import { UpdateRequest } from "firebase-admin/auth";
import { Timestamp } from "firebase-admin/firestore";

import { authAdmin, firestoreAdmin } from "~/server/firebase/firebaseAdmin";
import { SITES_COLLECTION, USERS_COLLECTION } from "~/server/firebase/firestoreCollections";

import { Notification, Site, WelcomeMessageNotification } from "~/types/server";

import { handleUserError } from "../errors/handleAuthError";
import { deleteRefArray } from "../firestoreUtils";
import { deleteSitePages } from "./siteUtils";

export async function getUserById(uid: string) {
    const user = await authAdmin.getUser(uid).catch(handleUserError);
    return user;
}

export async function updateUserById(uid: string, data: UpdateRequest) {
    await authAdmin.updateUser(uid, data).catch(handleUserError);
}

export async function deleteUserById(uid: string) {
    await authAdmin.deleteUser(uid).catch(handleUserError);
}

///////////
// SITES //
///////////

export async function listUserSites(uid: string) {
    const siteSnapshots = await SITES_COLLECTION.where("uid", "==", uid).get();
    return siteSnapshots.docs.map(doc => doc.data()) as Site[];
}

export async function listUserSiteNames(uid: string) {
    const siteSnapshots = await USERS_COLLECTION.doc(uid).collection("sites").get();
    return siteSnapshots.docs.map(doc => doc.data());
}

export async function deleteUserSites(uid: string) {
    const siteSnapshots = await SITES_COLLECTION.where("uid", "==", uid).get();
    const siteDocs = siteSnapshots.docs;
    const siteIds = siteDocs.map(doc => doc.id);
    const siteRefs = siteDocs.map(doc => doc.ref);
    const siteNameRefs = siteDocs.map(doc => {
        const { name } = doc.data() as Site;
        return USERS_COLLECTION.doc(uid).collection("sites").doc(name);
    });
    return await Promise.all([
        deleteRefArray(siteNameRefs), // Delete all site name refs
        ...siteRefs.map(ref => firestoreAdmin.recursiveDelete(ref)),
        ...siteIds.map(id => deleteSitePages(id)), // And all pages of these sites
    ]);
}

///////////
// EXTRA //
///////////

export async function initializeUser(uid: string) {
    const userRef = USERS_COLLECTION.doc(uid);
    await firestoreAdmin.runTransaction(async t => {
        // I should add some simple data to the user record. Just to mark the user as "created"
        // If this function is called on the same user again, it should fail
        // First, we need to generate a notification for this user
        const notification: WelcomeMessageNotification = {
            id: "WELCOME_MESSAGE",
            type: "WelcomeMessage",
            href: "/docs/getting-started",
            timestamp: Timestamp.now().toMillis(),
        };
        t.create(userRef.collection("notification").doc("WELCOME_MESSAGE"), notification);
    });
}
