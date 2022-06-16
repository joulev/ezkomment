import { PageConfig } from "next";

import { uploadUserPhoto } from "~/server/handlers/imageHandlers";
import { authenticateUidWithJWT } from "~/server/middlewares/authenticateRequests";
import { parseUserPhoto } from "~/server/middlewares/parseForms";
import { ncRouter } from "~/server/utils/nextHandlerUtils";

import { ApiRequestWithFormData } from "~/types/server/nextApi.type";

export const config: PageConfig = {
    api: {
        bodyParser: false,
    },
};

const handler = ncRouter<ApiRequestWithFormData>().post(
    authenticateUidWithJWT,
    parseUserPhoto,
    uploadUserPhoto
);

export default handler;
