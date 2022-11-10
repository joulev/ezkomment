import {
    getSiteCustomisation,
    updateSiteCustomisation,
} from "~/server/handlers/customisationHandlers";
import { attachIdTokenWithJWT } from "~/server/middlewares/authenticateRequests";
import { ncRouter } from "~/server/utils/nextHandlerUtils";

const handler = ncRouter()
    .get(getSiteCustomisation)
    .put(attachIdTokenWithJWT, updateSiteCustomisation);

export default handler;
