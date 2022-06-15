import { deleteComment, updateComment } from "~/server/handlers/commentHandlers";
import { sanitizeUpdateCommentRequest } from "~/server/middlewares/sanitizeRequest/comments";
import { ncRouter } from "~/server/utils/nextHandlerUtils";

const handler = ncRouter().put(sanitizeUpdateCommentRequest, updateComment).delete(deleteComment);

export default handler;
