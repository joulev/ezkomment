import {
    getSiteCustomisation,
    updateSiteCustomisation,
} from "~/old/server/handlers/customisationHandlers";
import { attachIdTokenWithJWT } from "~/old/server/middlewares/authenticateRequests";
import { ncRouter } from "~/old/server/utils/nextHandlerUtils";

const handler = ncRouter()
    .get(getSiteCustomisation)
    .put(attachIdTokenWithJWT, updateSiteCustomisation);

export default handler;
