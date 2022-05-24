import { Request, Response } from "express";
import { FieldValue } from "firebase-admin/firestore";

import { firestoreAdmin } from "../lib/firebaseAdmin";
import { deleteCollection, reportBadRequest } from "./extraUtils";

/**
 * Utilities for individual page
 * Each page contains these infomation
 * - url: the url of this page
 * - uid: uid of the user that own this page
 * - site-name: the name of the site that this page is contained inside
 * - comments: a collections of comment, each comments may store extra information
 * What should a comment contain?
 * - created time (can we use this as a primary key?)
 * - content
 * - author (allow anonymous author)
 * Created pages cannot be updated, but the subcollections inside it can.
 * A comment stores its version, this will be implemented later.
 */

const PAGES_COLLECTION = firestoreAdmin.collection("pages");

export async function getPage(req: Request, res: Response) {
    try {
        // May be changed to req.params
        const { pageURL } = req.body;
        const pageRef = PAGES_COLLECTION.doc(pageURL);
        // first get the basic information about this page
        const pageInfos = await pageRef.get();
        const listComments = await pageRef.collection("comment").get();
        res.status(200).json({
            message: "Successfully got page information",
            data: pageInfos.data(),
            comments: listComments.docs,
        });
    } catch (error) {
        reportBadRequest(res, error, "Bad request: cannot get page's information");
    }
}

export async function createPage(req: Request, res: Response) {
    try {
        // Need uid and siteName
        const { pageURL, uid, siteId } = req.body;
        await PAGES_COLLECTION.doc(pageURL).create({
            pageURL,
            uid,
            siteId, // a ref to the site that contains this page. May be changed to other format.
        });
        res.status(201).json({ message: "Successfully created new page" });
    } catch (error) {
        reportBadRequest(res, error, "Bad request: cannot create new page");
    }
}

/**
 * Creates a new comment in a given page.
 */
export async function createPageComment(req: Request, res: Response) {
    try {
        const { pageURL, commentContent } = req.body;
        const result = await PAGES_COLLECTION.doc(pageURL).collection("comments").add({
            commentContent,
            createdAt: FieldValue.serverTimestamp(),
            updatedAt: FieldValue.serverTimestamp(),
        });
        res.status(201).json({
            message: "Successfully created new comment",
            commentId: result.id,
        });
    } catch (error) {
        reportBadRequest(
            res,
            error,
            "Bad request: cannot create a new comment in the targeted page"
        );
    }
}

/**
 * Updates a comment in a given page.
 */
export async function updatePageComment(req: Request, res: Response) {
    try {
        const { pageURL, commentContent, commentId } = req.body;
        await PAGES_COLLECTION.doc(pageURL).collection("comments").doc(commentId).update({
            commentContent,
            updatedAt: FieldValue.serverTimestamp(),
        });
        res.status(200).json({ message: "Successfully updated comment" });
    } catch (error) {
        reportBadRequest(res, error, "Bad request: cannot update the comment in the targeted page");
    }
}

/**
 * Deletes a comment in a given page.
 */
export async function deletePageComment(req: Request, res: Response) {
    try {
        const { pageURL, commentId } = req.body;
        await PAGES_COLLECTION.doc(pageURL).collection("comments").doc(commentId).delete();
        res.status(200).json({ message: "Successfully deleted comment" });
    } catch (error) {
        reportBadRequest(res, error, "Bad request: cannot delete the comment in the targeted page");
    }
}

/**
 * Deletes a page and ALL comments in it.
 */
export async function deletePage(req: Request, res: Response) {
    try {
        const pageURL = req.body.pageURL;
        const pageRef = PAGES_COLLECTION.doc(pageURL);

        await deleteCollection(pageRef.collection("comments"));
        await pageRef.delete();
        res.status(200).json({ message: "Successfully deleted page and its content" });
    } catch (error) {
        reportBadRequest(res, error, "Bad request: cannot delete page and its content");
    }
}
