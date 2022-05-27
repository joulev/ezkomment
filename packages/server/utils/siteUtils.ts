// TODO: Fix sites and pages models
import { firestoreAdmin } from "@server/lib/firebaseAdmin";
import { CreateSiteRequest, UpdateSiteRequest } from "@server/models";

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
    return await SITES_COLLECTION.doc(siteId).get();
}

/**
 * Creates a site.
 * @param data The data of the site to be created.
 */
export async function createSite(data: CreateSiteRequest) {
    const siteRef = data.id ? SITES_COLLECTION.doc(data.id) : SITES_COLLECTION.doc();
    return await siteRef.create({ id: siteRef.id, ...data });
}

/**
 * Updates a site with the given id.
 * @param siteId The site's id
 */
export async function updateSiteById(siteId: string, data: UpdateSiteRequest) {
    return await SITES_COLLECTION.doc(siteId).update(data);
}

/**
 * Deletes a site with the given id.
 * @param siteId The site's id
 */
export async function deleteSiteById(siteId: string) {
    return await SITES_COLLECTION.doc(siteId).delete();
}
