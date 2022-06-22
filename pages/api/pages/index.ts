import { createPage } from "~/server/handlers/pageHandlers";
import { attachIdTokenWithJWT } from "~/server/middlewares/authenticateRequests";
import { sanitizeCreatePageRequest } from "~/server/middlewares/sanitizeRequests/pages";
import { ncRouter } from "~/server/utils/nextHandlerUtils";

import { AuthenticatedApiRequest } from "~/types/server/nextApi.type";

const handler = ncRouter<AuthenticatedApiRequest>().post(
    sanitizeCreatePageRequest,
    attachIdTokenWithJWT,
    createPage
);

export default handler;
