import { JSDOM } from "jsdom";

import md2html from "~/misc/markdown";

import { Comment, Page } from "~/types/server";
import { EmbedConfigurations } from "~/types/server/nextApi.type";

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

export function compileComments2html(comments: Comment[]) {
    return Promise.all(
        comments.map(async ({ text, ...rest }) => ({ text: await md2html(text), ...rest }))
    );
}

export function generateCommentHTML(html: string, config: EmbedConfigurations, dark?: boolean) {
    if (typeof window !== "undefined")
        throw new CustomApiError("This function should be ran on the server", 403);
    const dom = new JSDOM(html);
    const document = dom.window.document;
    const script = document.createElement("script");
    script.textContent = `
        import ezkomment from "/v1/js/${
            process.env.NODE_ENV === "production" ? "ezkomment.min.js" : "ezkomment.js"
        }";
        ezkomment(${JSON.stringify(config)});
    `;
    script.setAttribute("type", "module");
    document.head.appendChild(script);
    if (dark) document.documentElement.classList.add("dark");
    return dom.serialize();
}
