import { Page } from "~/types/server";

import { PAGES_COLLECTION } from "../firebase/firestoreCollections";
import CustomApiError from "./errors/customApiError";

export async function checkExist(siteId: string, pageId: string) {
    const pageRef = PAGES_COLLECTION.doc(pageId);
    const pageSnapshot = await pageRef.get();
    if (!pageSnapshot.exists) {
        throw new CustomApiError("Page does not exist", 404);
    }
    const pageData = pageSnapshot.data() as Page;
    if (pageData.siteId !== siteId) {
        throw new CustomApiError("Ids do not match", 403);
    }
}
