import { createPage } from "~/server/handlers/pageHandlers";
import { ncRouter } from "~/server/utils/nextHandlerUtils";

const handler = ncRouter().post(createPage);

export default handler;
