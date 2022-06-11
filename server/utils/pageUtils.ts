import { firestoreAdmin } from "~/server/firebase/firebaseAdmin";

import { CreatePageRequest, UpdatePageBodyParams } from "~/types/server";

const PAGES_COLLECTION = firestoreAdmin.collection("pages");

export async function getPageById(pageId: string) {
    const result = await PAGES_COLLECTION.doc(pageId).get();
    if (!result.exists) {
        throw Error("No such page!");
    }
    return result.data();
}

export async function createPage(data: CreatePageRequest) {
    const pageRef = PAGES_COLLECTION.doc();
    return await pageRef.create({ id: pageRef.id, ...data });
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
