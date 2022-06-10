import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";

import { deletePageComment, updatePageComment } from "~/server/handlers/pageHandlers";

const handler = nc<NextApiRequest, NextApiResponse>()
    .post(updatePageComment)
    .delete(deletePageComment);

export default handler;
