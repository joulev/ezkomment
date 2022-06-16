import { FieldValue } from "firebase-admin/firestore";

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
        const { siteId, url } = data;
        const pageRef = PAGES_COLLECTION.doc();
        const pageId = pageRef.id;
        return await firestoreAdmin.runTransaction(async t => {
            const siteRef = SITES_COLLECTION.doc(siteId);
            const siteSnapshot = await siteRef.get();
            if (!siteSnapshot.exists) {
                throw new CustomApiError("Site does not exist", 404);
            }
            const siteData = siteSnapshot.data() as Site;
            if (!url.includes(siteData.domain)) {
                throw new CustomApiError("Site domain and page url do not match", 400);
            }
            const newPage = { id: pageId, ...data };
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
        return await pageRef.update(data);
    } catch (err) {
        handleFirestoreError(err);
    }
}

export async function deletePageById(pageId: string) {
    try {
        const pageRef = PAGES_COLLECTION.doc(pageId);
        return await pageRef.delete();
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
        const pageRefs = pageSnapshots.docs.map(doc => doc.ref);
        const pageIds = pageSnapshots.docs.map(doc => doc.id);
        return await Promise.all([
            deleteRefArray(pageRefs), // DELETE all pages
            ...pageIds.map(id => deletePageCommentsById(id)), // And their comments
        ]);
    } catch (err) {
        handleFirestoreError(err);
    }
}
