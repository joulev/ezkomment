import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";

import { deleteUser, getUser, updateUser } from "~/server/handlers/userHandlers";
import { validateUidWithJWT } from "~/server/middlewares/validateRequests";

const handler = nc<NextApiRequest, NextApiResponse>()
    .get(getUser)
    .post(validateUidWithJWT, updateUser)
    .delete(validateUidWithJWT, deleteUser);

export default handler;
