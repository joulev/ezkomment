import { authAdmin } from "~/server/firebase/app";
import { SITES_COLLECTION, USERS_COLLECTION } from "~/server/firebase/collections";
import { Site, User, Notification, ClientUser } from "~/types/server";

/* GET */

async function getUser(uid: string): Promise<User> {
    const { email, displayName, photoURL, providerData: rawData } = await authAdmin.getUser(uid);
    const providerData = rawData.map(({ ...obj }) => obj); // convert to plain object
    return { uid, email, displayName, photoURL, providerData };
}
async function listUserSites(uid: string): Promise<Site[]> {
    const siteSnapshots = await SITES_COLLECTION.where("uid", "==", uid).get();
    return siteSnapshots.docs.map(doc => doc.data()) as Site[];
}
async function listUserNotifications(uid: string): Promise<Notification[]> {
    const notificationSnapshots = await USERS_COLLECTION.doc(uid).collection("notification").get();
    const data = notificationSnapshots.docs.map(doc => doc.data()) as Notification[];
    return data.sort((c1, c2) => c2.timestamp - c1.timestamp);
}
export async function get(uid: string): Promise<ClientUser> {
    const user = await getUser(uid);
    const sites = await listUserSites(uid);
    const notifications = await listUserNotifications(uid);
    return { ...user, sites, notifications };
}

// export async function updateUserById(uid: string, data: UpdateRequest) {
//     await authAdmin.updateUser(uid, data);
// }

// export async function deleteUserById(uid: string) {
//     await authAdmin.deleteUser(uid);
// }

// export async function listUserSiteNames(uid: string) {
//     const siteSnapshots = await USERS_COLLECTION.doc(uid).collection("sites").get();
//     return siteSnapshots.docs.map(doc => doc.data());
// }

// export async function deleteUserSites(uid: string) {
//     const siteSnapshots = await SITES_COLLECTION.where("uid", "==", uid).get();
//     const siteDocs = siteSnapshots.docs;
//     const siteIds = siteDocs.map(doc => doc.id);
//     const siteRefs = siteDocs.map(doc => doc.ref);
//     const siteNameRefs = siteDocs.map(doc => {
//         const { name } = doc.data() as Site;
//         return USERS_COLLECTION.doc(uid).collection("sites").doc(name);
//     });
//     return await Promise.all([
//         deleteRefArray(siteNameRefs), // Delete all site name refs
//         ...siteRefs.map(ref => firestoreAdmin.recursiveDelete(ref)),
//         ...siteIds.map(id => deleteSitePages(id)), // And all pages of these sites
//     ]);
// }

///////////
// EXTRA //
///////////

// export async function initializeUserById(uid: string) {
//     const WELCOME_MESSAGE_ID = "WELCOME_MESSAGE";
//     const userRef = USERS_COLLECTION.doc(uid);
//     await authAdmin.updateUser(uid, { emailVerified: true }).catch(handleUserError);
//     await firestoreAdmin.runTransaction(async t => {
//         // I should add some simple data to the user record. Just to mark the user as "created"
//         // If this function is called on the same user again, it should fail
//         // First, we need to generate a notification for this user
//         const notification: WelcomeMessageNotification = {
//             id: WELCOME_MESSAGE_ID,
//             type: "WelcomeMessage",
//             href: "/docs/tutorial/getting-started",
//             timestamp: Timestamp.now().toMillis(),
//         };
//         t.create(userRef.collection("notification").doc(WELCOME_MESSAGE_ID), notification);
//     });
// }
