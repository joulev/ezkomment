import { createSite } from "~/server/handlers/siteHandlers";
import { listUserSites } from "~/server/handlers/userHandlers";
import { ncRouter } from "~/server/utils/nextHandlerUtils";

const handler = ncRouter().get(listUserSites).post(createSite);

export default handler;
