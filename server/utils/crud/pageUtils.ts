/**
 * To ensure the uniqueness of page's name (regarding other pages that share the same site), we can
 * use a sub-collection.
 *
 * Using sub-collection makes look up fast.
 */
import { WriteResult } from "firebase-admin/firestore";

import { firestoreAdmin } from "~/server/firebase/firebaseAdmin";
import CustomApiError from "~/server/utils/errors/customApiError";
import { handleFirestoreError } from "~/server/utils/errors/handleFirestoreError";
import { deleteRefArray } from "~/server/utils/firestoreUtils";

import { CreatePageRequest, Page, Site, UpdatePageBodyParams } from "~/types/server";

import { deletePageCommentsById } from "./commentUtils";

const PAGES_COLLECTION = firestoreAdmin.collection("pages");
const SITES_COLLECTION = firestoreAdmin.collection("sites");

export async function getPageById(pageId: string) {
    try {
        const result = await PAGES_COLLECTION.doc(pageId).get();
        if (!result.exists) {
            throw new CustomApiError("Page does not exist", 404);
        }
        return result.data() as Page;
    } catch (err) {
        handleFirestoreError(err);
    }
}

export async function createPage(data: CreatePageRequest) {
    try {
        const { siteId, url, name } = data;
        const pageRef = PAGES_COLLECTION.doc();
        const pageId = pageRef.id;
        const newPage = { id: pageId, ...data };
        return await firestoreAdmin.runTransaction(async t => {
            const siteRef = SITES_COLLECTION.doc(siteId);
            const sitePageRef = siteRef.collection("pages").doc(name);
            const siteSnapshot = await siteRef.get();
            if (!siteSnapshot.exists) {
                throw new CustomApiError("Site does not exist", 404);
            }
            const siteData = siteSnapshot.data() as Site;
            if (!url.includes(siteData.domain)) {
                throw new CustomApiError("Site domain and page url do not match", 400);
            }
            /**
             * If a page with the same name already exists in the site, this operation will fail,
             * making the entire transaction fail as well.
             */
            t.create(sitePageRef, { id: pageId });
            t.create(pageRef, newPage);
            // statistic?
            // t.update(siteRef, { pageCount: FieldValue.increment(1) });
            return newPage;
        });
    } catch (err) {
        handleFirestoreError(err);
    }
}

export async function updatePageById(pageId: string, data: UpdatePageBodyParams) {
    try {
        const pageRef = PAGES_COLLECTION.doc(pageId);
        const newName = data.name;
        return await firestoreAdmin.runTransaction(async t => {
            if (newName !== undefined) {
                // We will need to look up to get the page's name
                const pageSnapshot = await t.get(pageRef);
                if (!pageSnapshot.exists) {
                    throw new CustomApiError("Page does not exist", 404);
                }
                const pageData = pageSnapshot.data() as Page;
                const oldName = pageData.name;
                const siteId = pageData.siteId;
                // Now update the name list
                t.delete(SITES_COLLECTION.doc(siteId).collection("pages").doc(oldName));
                t.create(SITES_COLLECTION.doc(siteId).collection("pages").doc(newName), {
                    id: pageId,
                });
            }
            t.update(pageRef, data);
        });
    } catch (err) {
        handleFirestoreError(err);
    }
}

export async function deletePageById(pageId: string) {
    try {
        const pageRef = PAGES_COLLECTION.doc(pageId);
        return await firestoreAdmin.runTransaction(async t => {
            const pageSnapshot = await t.get(pageRef);
            if (!pageSnapshot.exists) {
                throw new CustomApiError("Page does not exist", 404);
            }
            const { name, siteId } = pageSnapshot.data() as Page;
            t.delete(SITES_COLLECTION.doc(siteId).collection("pages").doc(name));
            t.delete(pageRef);
        });
    } catch (err) {
        handleFirestoreError(err);
    }
}

function querySitePagesById(siteId: string) {
    return PAGES_COLLECTION.where("siteId", "==", siteId);
}

export async function listSitePagesById(siteId: string) {
    try {
        const pageSnapshots = await querySitePagesById(siteId).get();
        return pageSnapshots.docs.map(doc => doc.data());
    } catch (err) {
        handleFirestoreError(err);
    }
}

export async function deleteSitePagesById(siteId: string) {
    try {
        const pageSnapshots = await querySitePagesById(siteId).get();
        if (pageSnapshots.empty) return;
        const pageDocs = pageSnapshots.docs;
        const pageRefs = pageDocs.map(doc => doc.ref);
        const pageIds = pageDocs.map(doc => doc.id);
        const pageNameRefs = pageDocs.map(doc => {
            const { name } = doc.data() as Page;
            return SITES_COLLECTION.doc(siteId).collection("pages").doc(name);
        });
        return await Promise.all([
            deleteRefArray(pageRefs), // DELETE all pages
            deleteRefArray(pageNameRefs), // DELETE all page name refs
            ...pageIds.map(id => deletePageCommentsById(id)), // And their comments
        ]);
    } catch (err) {
        handleFirestoreError(err);
    }
}

export async function importPages(data: Page[]) {
    return await firestoreAdmin.runTransaction(async t => {
        for (const page of data) {
            const { id, siteId, name } = page;
            t.create(PAGES_COLLECTION.doc(id), page);
            t.create(SITES_COLLECTION.doc(siteId).collection("pages").doc(name), { id });
        }
    });
}
