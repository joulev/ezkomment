import { deletePage, getPage, updatePage } from "~/server/handlers/pageHandlers";
import { ncRouter } from "~/server/utils/nextHandlerUtils";

const handler = ncRouter().get(getPage).put(updatePage).delete(deletePage);

export default handler;
