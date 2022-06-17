import { PageConfig } from "next";

import { uploadSiteIcon } from "~/server/handlers/imageHandlers";
import { authenticateWithJWT } from "~/server/middlewares/authenticateRequests";
import { parseSiteIcon } from "~/server/middlewares/parseForms";
import { ncRouter } from "~/server/utils/nextHandlerUtils";

import { ApiRequestWithFormData } from "~/types/server/nextApi.type";

export const config: PageConfig = {
    api: {
        bodyParser: false,
    },
};

const handler = ncRouter<ApiRequestWithFormData>().put(
    authenticateWithJWT,
    parseSiteIcon,
    uploadSiteIcon
);

export default handler;
