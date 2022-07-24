import {
    publicCreateComment,
    publicListPageApprovedComments,
} from "~/server/handlers/publicApiHandlers";
import { sanitizePublicCreateCommentRequest } from "~/server/middlewares/sanitizeRequests/publicApi";
import { ncRouter } from "~/server/utils/nextHandlerUtils";

const handler = ncRouter()
    .get(publicListPageApprovedComments)
    .post(sanitizePublicCreateCommentRequest, publicCreateComment);

export default handler;
