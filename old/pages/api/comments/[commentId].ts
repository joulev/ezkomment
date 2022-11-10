import { deleteComment, updateComment } from "~/old/server/handlers/commentHandlers";
import { sanitizeUpdateCommentRequest } from "~/old/server/middlewares/sanitizeRequests/comments";
import { ncRouter } from "~/old/server/utils/nextHandlerUtils";

const handler = ncRouter().put(sanitizeUpdateCommentRequest, updateComment).delete(deleteComment);

export default handler;
