import { ncRouter } from "~/server/utils/nextHandlerUtils";
import { extractFirstQueryValue } from "~/server/utils/nextHandlerUtils";

import generateCommentHTML from "~/client/lib/generateCommentHTML";

import { embedURLs } from "~/types/server/nextApi.type";

import html from "~/constants/sampleCommentCode";

const handler = ncRouter().get((req, res) => {
    /**
     * I don't need siteId at the momment.
     */
    const { siteId, pageId } = extractFirstQueryValue(req);
    const URLs: embedURLs = {
        getURL: `/api/pages/${pageId}/comments`,
        postURL: `/api/comments`,
    };
    const generatedHTML = generateCommentHTML(html, URLs);
    res.send(generatedHTML);
});

export default handler;
