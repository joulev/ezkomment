import { firestoreAdmin } from "~/server/firebase/firebaseAdmin";
import CustomApiError from "~/server/utils/errors/customApiError";

import { CreatePageRequest, Page, Site, UpdatePageBodyParams } from "~/types/server";

const PAGES_COLLECTION = firestoreAdmin.collection("pages");
const SITES_COLLECTION = firestoreAdmin.collection("sites");

export async function getPageById(pageId: string) {
    const result = await PAGES_COLLECTION.doc(pageId).get();
    if (!result.exists) {
        throw Error("No such page!");
    }
    return result.data() as Page;
}

export async function createPage(data: CreatePageRequest) {
    const { siteId, url } = data;
    const pageRef = PAGES_COLLECTION.doc();
    const pageId = pageRef.id;
    return await firestoreAdmin.runTransaction(async t => {
        const siteSnapshot = await SITES_COLLECTION.doc(siteId).get();
        if (!siteSnapshot.exists) {
            throw new CustomApiError("Site does not exist", 404);
        }
        const siteData = siteSnapshot.data() as Site;
        if (!url.includes(siteData.domain)) {
            throw new CustomApiError("Site domain and page url do not match", 400);
        }
        const newPage = { id: pageId, ...data };
        t.create(pageRef, newPage);
        return newPage;
    });
}

export async function updatePageById(pageId: string, data: UpdatePageBodyParams) {
    return await PAGES_COLLECTION.doc(pageId).update(data);
}

export async function deletePageById(pageId: string) {
    return await PAGES_COLLECTION.doc(pageId).delete();
}

async function querySitePagesById(siteId: string) {
    return (await PAGES_COLLECTION.where("siteId", "==", siteId).get()).docs;
}

export async function listSitePagesById(siteId: string) {
    return (await querySitePagesById(siteId)).map(doc => doc.data());
}

export async function deleteSitePagesById(siteId: string) {
    const pageIds = (await querySitePagesById(siteId)).map(doc => doc.id);
    return await Promise.all(pageIds.map(async id => deletePageById(id)));
}
