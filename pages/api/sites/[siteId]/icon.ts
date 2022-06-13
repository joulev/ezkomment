import { PageConfig } from "next";

import { uploadSiteIcon } from "~/server/handlers/imageHandlers";
import { parseSiteIcon } from "~/server/middlewares/parseForms";
import { ncRouter } from "~/server/utils/nextHandlerUtils";

import { ApiRequestWithFormData } from "~/types/server/nextApi.type";

export const config: PageConfig = {
    api: {
        bodyParser: false,
    },
};

const handler = ncRouter<ApiRequestWithFormData>().post(parseSiteIcon, uploadSiteIcon);

export default handler;
