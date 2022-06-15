// TODO: Fix sites and pages models
import { firestoreAdmin } from "~/server/firebase/firebaseAdmin";

import { CreateSiteRequest, UpdateSiteBodyParams } from "~/types/server";

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
    const result = await SITES_COLLECTION.doc(siteId).get();
    if (!result.exists) {
        throw Error("No such site!");
    }
    return result.data();
}

/**
 * Creates a site.
 * @param data The data of the site to be created.
 */
export async function createSite(data: CreateSiteRequest) {
    const siteRef = SITES_COLLECTION.doc();
    return await siteRef.create({ id: siteRef.id, ...data });
}

/**
 * Updates a site with the given id.
 * @param siteId The site's id
 */
export async function updateSiteById(siteId: string, data: UpdateSiteBodyParams) {
    return await SITES_COLLECTION.doc(siteId).update(data);
}

/**
 * Deletes a site with the given id.
 * @param siteId The site's id
 */
export async function deleteSiteById(siteId: string) {
    return await SITES_COLLECTION.doc(siteId).delete();
}

async function queryUserSitesById(uid: string) {
    return (await SITES_COLLECTION.where("uid", "==", uid).get()).docs;
}

export async function listUserSitesById(uid: string) {
    return (await queryUserSitesById(uid)).map(doc => doc.data());
}

export async function deleteUserSitesById(uid: string) {
    const siteIds = (await queryUserSitesById(uid)).map(doc => doc.id);
    return await Promise.all(siteIds.map(async id => deleteSiteById(id)));
}
