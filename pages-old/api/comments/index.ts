import { createComment } from "~/server/handlers/commentHandlers";
import { sanitizeCreateCommentRequest } from "~/server/middlewares/sanitizeRequests/comments";
import { ncRouter } from "~/server/utils/nextHandlerUtils";

const handler = ncRouter().post(sanitizeCreateCommentRequest, createComment);

export default handler;
