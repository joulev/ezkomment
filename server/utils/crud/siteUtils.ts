/**
 * We also need to ensure the uniqueness of site's name.
 */
import { firestoreAdmin } from "~/server/firebase/firebaseAdmin";
import CustomApiError from "~/server/utils/errors/customApiError";

import { CreateSiteRequest, Site, UpdateSiteBodyParams } from "~/types/server";

import { handleFirestoreError } from "../errors/handleFirestoreError";
import { deleteRefArray } from "../firestoreUtils";
import { deleteSitePagesById } from "./pageUtils";

/**
 * The collection of sites.
 */
const SITES_COLLECTION = firestoreAdmin.collection("sites");
const USERS_COLLECTION = firestoreAdmin.collection("users");

/**
 * Get a site with the given id.
 *
 * @param siteId The site's id
 * @returns The data of the site.
 */
export async function getSiteById(siteId: string) {
    try {
        const result = await SITES_COLLECTION.doc(siteId).get();
        if (!result.exists) {
            throw new CustomApiError("Site does not exist", 404);
        }
        return result.data();
    } catch (err) {
        handleFirestoreError(err);
    }
}

/**
 * Creates a site.
 *
 * @param data The data of the site to be created
 * @returns The id of the created site.
 */
export async function createSite(data: CreateSiteRequest) {
    try {
        const { uid, name } = data;
        const siteRef = SITES_COLLECTION.doc();
        const siteId = siteRef.id;
        const newSite = {
            id: siteId,
            ...data,
        };
        return await firestoreAdmin.runTransaction(async t => {
            /**
             * Ensure uniqueness.
             */
            t.create(USERS_COLLECTION.doc(uid).collection("sites").doc(name), { id: siteId });
            t.create(siteRef, newSite);
            return newSite;
        });
    } catch (err) {
        handleFirestoreError(err);
    }
}

/**
 * Updates a site with the given id.
 * @param siteId The site's id
 */
export async function updateSiteById(siteId: string, data: UpdateSiteBodyParams) {
    try {
        const siteRef = SITES_COLLECTION.doc(siteId);
        const newName = data.name;
        return await firestoreAdmin.runTransaction(async t => {
            if (newName !== undefined) {
                // Look up the site's name
                const siteSnapshot = await t.get(siteRef);
                if (!siteSnapshot.exists) {
                    throw new CustomApiError("Site does not exist", 404);
                }
                const siteData = siteSnapshot.data() as Site;
                const oldName = siteData.name;
                const uid = siteData.uid;
                // Update the name list
                t.delete(USERS_COLLECTION.doc(uid).collection("sites").doc(oldName));
                t.create(USERS_COLLECTION.doc(uid).collection("sites").doc(newName), {
                    id: siteId,
                });
            }
            t.update(siteRef, data);
        });
    } catch (err) {
        handleFirestoreError(err);
    }
}

/**
 * Deletes a site with the given id.
 * @param siteId The site's id
 */
export async function deleteSiteById(siteId: string) {
    try {
        const siteRef = SITES_COLLECTION.doc(siteId);
        return await firestoreAdmin.runTransaction(async t => {
            const siteSnapshot = await t.get(siteRef);
            if (!siteSnapshot.exists) {
                throw new CustomApiError("Site does not exist", 404);
            }
            const { name, uid } = siteSnapshot.data() as Site;
            t.delete(USERS_COLLECTION.doc(uid).collection("sites").doc(name));
            t.delete(siteRef);
        });
    } catch (err) {
        handleFirestoreError(err);
    }
}

function queryUserSitesById(uid: string) {
    return SITES_COLLECTION.where("uid", "==", uid);
}

export async function listUserSitesById(uid: string) {
    try {
        const siteSnapshots = await queryUserSitesById(uid).get();
        return siteSnapshots.docs.map(doc => doc.data());
    } catch (err) {
        handleFirestoreError(err);
    }
}

export async function deleteUserSitesById(uid: string) {
    try {
        const siteSnapshots = await queryUserSitesById(uid).get();
        if (siteSnapshots.empty) return;
        const siteDocs = siteSnapshots.docs;
        const siteRefs = siteDocs.map(doc => doc.ref);
        const siteIds = siteDocs.map(doc => doc.id);
        const siteNameRefs = siteDocs.map(doc => {
            const { name } = doc.data() as Site;
            return USERS_COLLECTION.doc(uid).collection("sites").doc(name);
        });
        return await Promise.all([
            deleteRefArray(siteRefs), // Delete all sites
            deleteRefArray(siteNameRefs), // Delete all site name refs
            ...siteIds.map(id => deleteSitePagesById(id)), // And all pages of these sites
        ]);
    } catch (err) {
        handleFirestoreError(err);
    }
}
