import { createComment } from "~/server/handlers/commentHandlers";
import { listPageComments } from "~/server/handlers/pageHandlers";
import { ncRouter } from "~/server/utils/nextHandlerUtils";

const handler = ncRouter().get(listPageComments).post(createComment);

export default handler;
