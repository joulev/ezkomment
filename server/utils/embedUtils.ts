import rehypePresetMinify from "rehype-preset-minify";
import rehypeStringify from "rehype-stringify";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";

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

export async function md2html(md: string) {
    const processor = unified()
        .use(remarkParse)
        .use(remarkRehype)
        .use(rehypePresetMinify)
        .use(rehypeStringify);
    return String(await processor.process(md));
}
