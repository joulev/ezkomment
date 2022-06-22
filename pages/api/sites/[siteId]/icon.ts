import { PageConfig } from "next";

import { uploadSiteIcon } from "~/server/handlers/imageHandlers";
import { attachIdTokenWithJWT } from "~/server/middlewares/authenticateRequests";
import { parseSiteIcon } from "~/server/middlewares/parseForms";
import { ncRouter } from "~/server/utils/nextHandlerUtils";

import { AuthenticatedApiRequestWithFormData } from "~/types/server/nextApi.type";

export const config: PageConfig = {
    api: {
        bodyParser: false,
    },
};

const handler = ncRouter<AuthenticatedApiRequestWithFormData>().put(
    attachIdTokenWithJWT,
    parseSiteIcon,
    uploadSiteIcon
);

export default handler;
