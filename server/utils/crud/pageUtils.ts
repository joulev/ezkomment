import { FieldValue } from "firebase-admin/firestore";

import { firestoreAdmin } from "~/server/firebase/firebaseAdmin";
import { PAGES_COLLECTION, SITES_COLLECTION } from "~/server/firebase/firestoreCollections";
import CustomApiError from "~/server/utils/errors/customApiError";
import { handleFirestoreError } from "~/server/utils/errors/handleFirestoreError";
import { deleteRefArray } from "~/server/utils/firestoreUtils";

import { CreatePageBodyParams, Page, Site, UpdatePageBodyParams } from "~/types/server";

import { deletePageCommentsById } from "./commentUtils";

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

export async function createPage(data: CreatePageBodyParams) {
    try {
        const { siteId, url, name } = data;
        const pageRef = PAGES_COLLECTION.doc();
        const pageId = pageRef.id;
        const newPage: Page = {
            id: pageId,
            ...data,
            totalCommentCount: 0,
            pendingCommentCount: 0,
        };
        return await firestoreAdmin.runTransaction(async t => {
            const siteRef = SITES_COLLECTION.doc(siteId);
            const siteSnapshot = await siteRef.get();
            if (!siteSnapshot.exists) {
                throw new CustomApiError("Site does not exist", 404);
            }
            const siteData = siteSnapshot.data() as Site;
            if (!url.includes(siteData.domain)) {
                throw new CustomApiError("Site domain and page url do not match", 409);
            }
            // Increment the pageCount of the site by 1
            t.update(siteRef, { pageCount: FieldValue.increment(1) });
            /**
             * If a page with the same name already exists in the site, this operation will fail,
             * making the entire transaction fail as well.
             */
            t.create(siteRef.collection("pages").doc(name), { id: pageId });
            t.create(pageRef, newPage);
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
            const { name, siteId, totalCommentCount, pendingCommentCount } =
                pageSnapshot.data() as Page;
            const siteRef = SITES_COLLECTION.doc(siteId);
            // Decrease the number of page by 1, decrease the number of total comment count,
            // and pending comment count
            t.update(siteRef, {
                pageCount: FieldValue.increment(-1),
                totalCommentCount: FieldValue.increment(-totalCommentCount),
                pendingCommentCount: FieldValue.increment(-pendingCommentCount),
            });
            t.delete(siteRef.collection("pages").doc(name));
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
    const pageSnapshots = await querySitePagesById(siteId).get();
    return pageSnapshots.docs.map(doc => doc.data()) as Page[];
}

export async function listSiteBasicPagesById(siteId: string) {
    const pageSnapshots = await SITES_COLLECTION.doc(siteId).collection("pages").get();
    return pageSnapshots.docs.map(doc => doc.data());
}

/**
 * Deletes all pages of a site, including their comments as well. This method can also update the
 * site, if required.
 *
 * @param siteId The site's id
 * @param updateSite If true, the site will be updated. Default to false.
 */
export async function deleteSitePagesById(siteId: string, updateSite: boolean = false) {
    try {
        const pageSnapshots = await querySitePagesById(siteId).get();
        const pageDocs = pageSnapshots.docs;
        const pageRefs = pageDocs.map(doc => doc.ref);
        const pageIds = pageDocs.map(doc => doc.id);
        const pageNameRefs = pageDocs.map(doc => {
            const { name } = doc.data() as Page;
            return SITES_COLLECTION.doc(siteId).collection("pages").doc(name);
        });
        const promises: Promise<any>[] = [
            deleteRefArray(pageRefs), // DELETE all pages
            deleteRefArray(pageNameRefs), // DELETE all page name refs
            ...pageIds.map(id => deletePageCommentsById(id)), // And their comments
        ];
        if (updateSite) {
            const updateCommentCount = {
                totalCommentCount: 0,
                pendingCommentCount: 0,
            };
            // The update could fail here, if the site does not exist.
            promises.push(SITES_COLLECTION.doc(siteId).update(updateCommentCount));
        }
        return await Promise.all(promises);
    } catch (err) {
        handleFirestoreError(err);
    }
}
