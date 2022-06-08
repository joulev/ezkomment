import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";

import * as UserHandlers from "@server/handlers/userHandlers";
import { validateUidWithJWT } from "@server/middlewares/validateRequests";

const handler = nc<NextApiRequest, NextApiResponse>()
    .get(UserHandlers.getUser)
    .post(validateUidWithJWT, UserHandlers.updateUser)
    .delete(validateUidWithJWT, UserHandlers.deleteUser);

export default handler;
