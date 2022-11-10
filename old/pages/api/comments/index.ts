import { createComment } from "~/old/server/handlers/commentHandlers";
import { sanitizeCreateCommentRequest } from "~/old/server/middlewares/sanitizeRequests/comments";
import { ncRouter } from "~/old/server/utils/nextHandlerUtils";

const handler = ncRouter().post(sanitizeCreateCommentRequest, createComment);

export default handler;
