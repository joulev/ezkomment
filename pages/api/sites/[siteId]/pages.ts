import { listSitePages } from "~/server/handlers/siteHandlers";
import { attachIdTokenWithJWT } from "~/server/middlewares/authenticateRequests";
import { ncRouter } from "~/server/utils/nextHandlerUtils";

import { AuthenticatedApiRequest } from "~/types/server/nextApi.type";

const handler = ncRouter<AuthenticatedApiRequest>().get(attachIdTokenWithJWT, listSitePages);

export default handler;
