import { checkSitePageExists } from "~/old/server/middlewares/checkSitePageExists";
import { getSiteCustomisation } from "~/old/server/utils/crud/customisationUtils";
import { getSiteDomain } from "~/old/server/utils/crud/siteUtils";
import { generateCommentHTML } from "~/old/server/utils/embedUtils";
import { ncRouter } from "~/old/server/utils/nextHandlerUtils";
import { extractFirstQueryValue } from "~/old/server/utils/nextHandlerUtils";

import { EmbedConfigurations } from "~/old/types/server/nextApi.type";

const handler = ncRouter().get(checkSitePageExists, async (req, res) => {
    const { dark } = req.query;
    const { siteId, pageId } = extractFirstQueryValue(req);
    const config: EmbedConfigurations = {
        pageId,
        getURL: `/api/pages/${pageId}/comments`,
        postURL: `/api/comments`,
    };
    const domain = await getSiteDomain(siteId);
    const { customisation } = await getSiteCustomisation(siteId);
    const generatedHTML = generateCommentHTML(customisation, config, dark === "1");
    if (domain !== "*")
        res.setHeader("Content-Security-Policy", `frame-ancestors http://localhost:* ${domain}`);
    res.status(200).send(generatedHTML);
});

export default handler;
