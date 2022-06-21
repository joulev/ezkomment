import { createPage } from "~/server/handlers/pageHandlers";
import { authenticateWithJWT } from "~/server/middlewares/authenticateRequests";
import { sanitizeCreatePageRequest } from "~/server/middlewares/sanitizeRequests/pages";
import { ncRouter } from "~/server/utils/nextHandlerUtils";

const handler = ncRouter().post(authenticateWithJWT, sanitizeCreatePageRequest, createPage);

export default handler;
