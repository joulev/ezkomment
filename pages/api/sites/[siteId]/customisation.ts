import {
    getSiteCustomisation,
    updateSiteCustomisation,
} from "~/server/handlers/customisationHandlers";
import { attachIdTokenWithJWT } from "~/server/middlewares/authenticateRequests";
import { ncRouter } from "~/server/utils/nextHandlerUtils";

import { AuthenticatedApiRequest } from "~/types/server/nextApi.type";

const handler = ncRouter<AuthenticatedApiRequest>()
    .get(attachIdTokenWithJWT, getSiteCustomisation)
    .put(attachIdTokenWithJWT, updateSiteCustomisation);

export default handler;
