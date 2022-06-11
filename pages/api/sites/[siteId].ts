import { deleteSite, getSite, updateSite } from "~/server/handlers/siteHandlers";
import { ncRouter } from "~/server/utils/nextHandlerUtils";

const handler = ncRouter().get(getSite).put(updateSite).delete(deleteSite);

export default handler;
