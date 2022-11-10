import { createPage } from "~/old/server/handlers/pageHandlers";
import { attachIdTokenWithJWT } from "~/old/server/middlewares/authenticateRequests";
import { sanitizeCreatePageRequest } from "~/old/server/middlewares/sanitizeRequests/pages";
import { ncRouter } from "~/old/server/utils/nextHandlerUtils";

const handler = ncRouter().post(sanitizeCreatePageRequest, attachIdTokenWithJWT, createPage);

export default handler;
