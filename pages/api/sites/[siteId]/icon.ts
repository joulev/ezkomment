import { PageConfig } from "next";

import { uploadSiteIcon } from "~/server/handlers/imageHandlers";
import { attachIdTokenWithJWT } from "~/server/middlewares/authenticateRequests";
import { parseSiteIcon } from "~/server/middlewares/parseForms";
import { ncRouter } from "~/server/utils/nextHandlerUtils";

export const config: PageConfig = {
    api: {
        bodyParser: false,
    },
};

const handler = ncRouter().put(attachIdTokenWithJWT, parseSiteIcon, uploadSiteIcon);

export default handler;
