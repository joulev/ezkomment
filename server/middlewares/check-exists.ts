import { PAGES_COLLECTION } from "~/server/firebase/collections";
import CustomApiError from "~/server/errors/custom-api-error";
import { ApiMiddleware, extractFirstQueryValue } from "~/server/next-connect";
import { Page } from "~/types/server";

const checkExists: ApiMiddleware = async (req, _, next) => {
    const { siteId, pageId } = extractFirstQueryValue(req);
    const pageRef = PAGES_COLLECTION.doc(pageId);
    const pageSnapshot = await pageRef.get();
    if (!pageSnapshot.exists) throw new CustomApiError("Page does not exist", 404);
    const pageData = pageSnapshot.data() as Page;
    if (pageData.siteId !== siteId) throw new CustomApiError("Ids do not match", 403);
    await next();
};

export default checkExists;
