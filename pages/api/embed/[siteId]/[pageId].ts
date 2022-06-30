import { checkExist } from "~/server/utils/embedUtils";
import { ncRouter } from "~/server/utils/nextHandlerUtils";
import { extractFirstQueryValue } from "~/server/utils/nextHandlerUtils";

/**
 * I will move this into `~/server`. Not now
 */
import generateCommentHTML from "~/client/lib/generateCommentHTML";

import { EmbedConfigurations } from "~/types/server/nextApi.type";

import html from "~/constants/sampleCommentCode";

const handler = ncRouter().get((req, res) => {
    /**
     * I don't need siteId at the momment.
     */
    const { siteId, pageId } = extractFirstQueryValue(req);
    /**
     * Fetch pageId to get basic metadata? And to checkwhether the page exists or not.
     * If page does not exist then we throw an error. Status code 404.
     */
    checkExist(siteId, pageId);

    /**
     * If the page exists, we will start rendering the comment section.
     * Question: What information do I need to render the section?
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
