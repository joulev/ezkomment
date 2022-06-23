import { listPageComments } from "~/server/handlers/pageHandlers";
import { ncRouter } from "~/server/utils/nextHandlerUtils";

const handler = ncRouter().get(listPageComments);

export default handler;
