import { PageConfig } from "next";

import { uploadUserPhoto } from "~/old/server/handlers/imageHandlers";
import { authenticatePathUidWithJWT } from "~/old/server/middlewares/authenticateRequests";
import { parseUserPhoto } from "~/old/server/middlewares/parseForms";
import { ncRouter } from "~/old/server/utils/nextHandlerUtils";

export const config: PageConfig = {
    api: {
        bodyParser: false,
    },
};

const handler = ncRouter().put(authenticatePathUidWithJWT, parseUserPhoto, uploadUserPhoto);

export default handler;
