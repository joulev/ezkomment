// TODO: Fix sites and pages models
import { firestoreAdmin } from "@server/lib/firebaseAdmin";
import { CreateSiteRequest, UpdateSiteRequest } from "@server/models";

import { deleteQuery } from "./extraUtils";

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
    await deleteSitePagesById(siteId);
    return await SITES_COLLECTION.doc(siteId).delete();
}

const PAGES_COLLECTION = firestoreAdmin.collection("pages");

/**
 * Delete ALL pages that belong to a site.
 * @param siteId The site's id
 */
export async function deleteSitePagesById(siteId: string) {
    await deleteQuery(PAGES_COLLECTION.where("id", "==", siteId));
}
