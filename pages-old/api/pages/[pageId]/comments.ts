import { listPageApprovedComments } from "~/server/handlers/pageHandlers";
import { ncRouter } from "~/server/utils/nextHandlerUtils";

/**
 * TODO
 * We will protect this route to only allow requests from "/api/embed/*"
 */
const handler = ncRouter().get(listPageApprovedComments);

export default handler;
