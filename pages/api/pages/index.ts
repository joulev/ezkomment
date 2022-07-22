import { createPage } from "~/server/handlers/pageHandlers";
import { attachIdTokenWithJWT } from "~/server/middlewares/authenticateRequests";
import { sanitizeCreatePageRequest } from "~/server/middlewares/sanitizeRequests/pages";
import { ncRouter } from "~/server/utils/nextHandlerUtils";

const handler = ncRouter().post(sanitizeCreatePageRequest, attachIdTokenWithJWT, createPage);

export default handler;
