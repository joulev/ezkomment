import { checkExist, generateCommentHTML } from "~/server/utils/embedUtils";
import { ncRouter } from "~/server/utils/nextHandlerUtils";
import { extractFirstQueryValue } from "~/server/utils/nextHandlerUtils";

import { EmbedConfigurations } from "~/types/server/nextApi.type";

import html from "~/constants/sampleCommentCode";

const handler = ncRouter().get(async (req, res) => {
    const { siteId, pageId } = extractFirstQueryValue(req);
    /**
     * Check whether the page exists or not.
     * If page does not exist then we throw an error with status code 404.
     * If the ids do not match then we throw an error with status code 403.
     */
    await checkExist(siteId, pageId);
    /**
     * If the page exists, we will start rendering the comment section.
     */
    const config: EmbedConfigurations = {
        pageId,
        getURL: `/api/pages/${pageId}/comments`,
        postURL: `/api/comments`,
    };
    const generatedHTML = generateCommentHTML(html, config);
    res.status(200).send(generatedHTML);
});

export default handler;