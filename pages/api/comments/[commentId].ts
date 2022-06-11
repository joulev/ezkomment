import { deleteCommentById, updateCommentById } from "~/server/utils/commentUtils";
import { ncRouter } from "~/server/utils/nextHandlerUtils";

const handler = ncRouter().put(updateCommentById).delete(deleteCommentById);

export default handler;
