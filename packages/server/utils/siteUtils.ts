// TODO: Fix sites and pages models
import { Request, Response } from "express";

import { firestoreAdmin } from "../lib/firebaseAdmin";
import { deleteCollection, reportBadRequest } from "./extraUtils";

/**
 * Create a collection named `userSites`
 * Each document will contain the user uid and another subcollection `sites`
 * Each sites will contains an array of pages_URL and addional properties if nessessary.
 *
 * collection: userSites
 *   doc: uid
 *     collection: sites
 *       doc: site-id
 *         string: site-id
 *         string: site-name (cannot be changed after being created)
 *         collection: pages
 *           doc:
 *             string: url
 *         <js, css url> (optional, if not exist then use default design)
 *
 */

/**
 * TODO: Add middlewares to check for cosistency between sites and pages
 */

const USER_SITES_COLLECTION = firestoreAdmin.collection("userSites");
const DEFAULT_CONFIG_URL = "[Some URL]";

export async function getSite(req: Request, res: Response) {
    try {
        const { uid, siteId } = req.body;
        const siteRef = USER_SITES_COLLECTION.doc(uid).collection("sites").doc(siteId);
        const siteInfos = await siteRef.get();
        if (!siteInfos.exists) {
            res.status(404).json({ error: "Not found: No such site" });
            return;
        }
        const listPages = await siteRef.collection("pages").get();
        res.status(200).json({
            message: "Successfully get site information",
            data: siteInfos.data(),
            pages: listPages.docs,
        });
    } catch (error) {
        reportBadRequest(res, error, "Bad request: cannot get site's information");
    }
}

/**
 * Create a site with a given name given the user's uid.
 */
export async function createSite(req: Request, res: Response) {
    try {
        const { uid, siteURL, siteId } = req.body;
        // siteId is optional, if there is no siteId then Firebase will auto generate it
        const configURL = req.body.configURL ?? DEFAULT_CONFIG_URL;
        const siteRef = USER_SITES_COLLECTION.doc(uid).collection("sites").doc(siteId);
        await siteRef.create({
            siteId: siteRef.id,
            siteURL,
            configURL,
        });
        res.status(201).json({
            message: "Successfully created new site",
            siteId: siteRef.id,
        });
    } catch (error) {
        reportBadRequest(res, error, "");
    }
}

export async function updateSite(req: Request, res: Response) {
    try {
        const { uid, siteURL, siteId } = req.body;
        const configURL = req.body.configURL ?? DEFAULT_CONFIG_URL;
        await USER_SITES_COLLECTION.doc(uid).collection("sites").doc(siteId).update({
            siteURL,
            configURL,
        });
        res.status(200).json({ message: "Successfully updated site information" });
    } catch (error) {
        reportBadRequest(res, error, "Bad request: cannot update site information");
    }
}

/**
 * Add a new page's URL into this site.
 */
export async function createSitePage(req: Request, res: Response) {
    try {
        const { uid, siteId, pageURL } = req.body;
        await USER_SITES_COLLECTION.doc(uid)
            .collection("sites")
            .doc(siteId)
            .collection("pages")
            .doc(pageURL)
            .create({ pageURL });
        res.status(200).json({ message: "Successfully add new page into site " });
    } catch (error) {
        reportBadRequest(res, error, "Bad request: cannot create new page in the targeted site");
    }
}

/**
 * Delete a page's URL from this site.
 */
export async function deleteSitePage(req: Request, res: Response) {
    try {
        const { uid, siteId, pageURL } = req.body;
        await USER_SITES_COLLECTION.doc(uid)
            .collection("sites")
            .doc(siteId)
            .collection("pages")
            .doc(pageURL)
            .delete();
        res.status(200).json({ message: "Successfully deleted page URL" });
    } catch (error) {
        reportBadRequest(res, error, "Bad request: cannot delete page in the targeted site");
    }
}

/**
 * Delete a site with a given name given the user's uid and the site's name.
 * Also, delete ALL associative pages related to this site.
 */
export async function deleteSite(req: Request, res: Response) {
    try {
        const { uid, siteId } = req.body;
        const siteRef = USER_SITES_COLLECTION.doc(uid).collection("sites").doc(siteId);
        await deleteCollection(siteRef.collection("pages"));
        await siteRef.delete();
        res.status(200).json({ message: "Successfully deleted site" });
    } catch (error) {
        reportBadRequest(res, error, "Bad request: cannot delete site and its content");
    }
}
