import { createComment } from "~/server/handlers/commentHandlers";
import { listPageComments } from "~/server/handlers/pageHandlers";
import { sanitizeCreateCommentRequest } from "~/server/middlewares/sanitizeRequests/comments";
import { ncRouter } from "~/server/utils/nextHandlerUtils";

const handler = ncRouter().get(listPageComments).post(sanitizeCreateCommentRequest, createComment);

export default handler;
