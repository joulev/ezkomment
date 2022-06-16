import { firestoreAdmin } from "~/server/firebase/firebaseAdmin";
import CustomApiError from "~/server/utils/errors/customApiError";

import { CreateSiteRequest, UpdateSiteBodyParams } from "~/types/server";

import { handleFirestoreError } from "../errors/handleFirestoreError";
import { deleteRefArray } from "../firestoreUtils";
import { deleteSitePagesById } from "./pageUtils";

/**
 * The collection of sites.
 */
const SITES_COLLECTION = firestoreAdmin.collection("sites");

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
        const siteRef = SITES_COLLECTION.doc();
        const siteId = siteRef.id;
        const newSite = {
            id: siteId,
            ...data,
        };
        await siteRef.create(newSite);
        return newSite;
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
        return await SITES_COLLECTION.doc(siteId).update(data);
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
        return await SITES_COLLECTION.doc(siteId).delete({ exists: true });
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
        const siteRefs = siteSnapshots.docs.map(doc => doc.ref);
        const siteIds = siteSnapshots.docs.map(doc => doc.id);
        return await Promise.all([
            deleteRefArray(siteRefs), // Delete all sites
            ...siteIds.map(id => deleteSitePagesById(id)), // And all pages of these sites
        ]);
    } catch (err) {
        handleFirestoreError(err);
    }
}
