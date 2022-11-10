import { PageConfig } from "next";

import { uploadSiteIcon } from "~/old/server/handlers/imageHandlers";
import { attachIdTokenWithJWT } from "~/old/server/middlewares/authenticateRequests";
import { parseSiteIcon } from "~/old/server/middlewares/parseForms";
import { ncRouter } from "~/old/server/utils/nextHandlerUtils";

export const config: PageConfig = {
    api: {
        bodyParser: false,
    },
};

const handler = ncRouter().put(attachIdTokenWithJWT, parseSiteIcon, uploadSiteIcon);

export default handler;
