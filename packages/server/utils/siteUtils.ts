import { Request, Response } from "express";

import { firestoreAdmin } from "../lib/firebaseAdmin";
import { deleteCollection, reportBadRequest } from "./extraUtils";

/**
 * Create a collection named `userSites`
 * Each document will contain the user uid and another subcollection `sites`
 * Each sites will contains an array of pages_URL and addional properties if nessessary.
 *
 * collection: userSites
 *   doc:
 *     string: uid
 *     collection: sites
 *       doc:
 *         string: site-name (cannot be changed after being created)
 *         collection: pages
 *           doc:
 *             string: url
 *         <js, css url> (optional, if not exist then use default design)
 *
 */

const BATCH_NUMBER = 10;
const USER_SITES_COLLECTION = firestoreAdmin.collection("userSites");

/**
 * Url to the config files, to be changed
 */
const DEFAULT_CONFIG_URL = "[Some URL]";

export async function getSite(req: Request, res: Response) {
    try {
        const { uid, siteName } = req.body;
        const siteRef = USER_SITES_COLLECTION.doc(uid).collection("sites").doc(siteName);
        const siteInfos = await siteRef.get();
        if (!siteInfos.exists) {
            res.status(404).json({ error: "Not found: No such site" });
            return;
        }
        const listPages = await siteRef.collection("pages").get();
        res.status(200).json({
            message: "Successfully get site information",
            data: { ...siteInfos.data(), ...listPages.docs },
        });
    } catch (error) {
        reportBadRequest(res, error, "");
    }
}

/**
 * Create a site with a given name given the user's uid.
 */
export async function createSite(req: Request, res: Response) {
    try {
        const { uid, siteName } = req.body;
        const configURL = req.body.configURL ?? DEFAULT_CONFIG_URL;
        await USER_SITES_COLLECTION.doc(uid).collection("sites").doc(siteName).create({
            siteName,
            configURL,
        });
        res.status(201).json({ message: "Successfully created new site" });
    } catch (error) {
        reportBadRequest(res, error, "");
    }
}

export async function updateSite(req: Request, res: Response) {
    try {
        const { uid, siteName } = req.body;
        const configURL = req.body.configURL ?? DEFAULT_CONFIG_URL;
        await USER_SITES_COLLECTION.doc(uid).collection("sites").doc(siteName).update({
            configURL,
        });
        res.status(200).json({ message: "Updated site information" });
    } catch (error) {
        reportBadRequest(res, error, "");
    }
}

/**
 * Add a new page's URL into this site.
 */
export async function createSitePage(req: Request, res: Response) {
    try {
        const { uid, siteName, pageURL } = req.body;
        await USER_SITES_COLLECTION.doc(uid)
            .collection("sites")
            .doc(siteName)
            .collection("pages")
            .doc(pageURL)
            .create({ pageURL });
        res.status(200).json({ message: "Successfully add new page into site " });
    } catch (error) {
        reportBadRequest(res, error, "");
    }
}

/**
 * Delete a page's URL from this site.
 */
export async function deleteSitePage(req: Request, res: Response) {
    try {
        const { uid, siteName, pageURL } = req.body;
        await USER_SITES_COLLECTION.doc(uid)
            .collection("sites")
            .doc(siteName)
            .collection("pages")
            .doc(pageURL)
            .delete();
        res.status(200).json({ message: "Successfully deleted page URL" });
    } catch (error) {
        reportBadRequest(res, error, "");
    }
}

/**
 * Delete a site with a given name given the user's uid and the site's name.
 * Also, delete ALL associative pages related to this site.
 */
export async function deleteSite(req: Request, res: Response) {
    try {
        const { uid, siteName } = req.body;
        const siteRef = USER_SITES_COLLECTION.doc(uid).collection("sites").doc(siteName);
        // Delete all pages that is contained within this site
        /** Modification required here! */
        await deleteCollection(siteRef.collection("pages"), "pathURL", BATCH_NUMBER);
        /** Modification required here! */
        await siteRef.delete();
        res.status(200).json({ message: "Successfully deleted site" });
    } catch (error) {
        reportBadRequest(res, error, "");
    }
}
