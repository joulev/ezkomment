import { PageConfig } from "next";

import { uploadUserPhoto } from "~/server/handlers/imageHandlers";
import { parseUserPhoto } from "~/server/middlewares/parseForms";
import { validateUidWithJWT } from "~/server/middlewares/validateRequests";
import { ncRouter } from "~/server/utils/nextHandlerUtils";

import { ApiRequestWithFormData } from "~/types/server/nextApi.type";

export const config: PageConfig = {
    api: {
        bodyParser: false,
    },
};

const handler = ncRouter<ApiRequestWithFormData>().post(
    validateUidWithJWT,
    parseUserPhoto,
    uploadUserPhoto
);

export default handler;
