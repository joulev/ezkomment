import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";

import { login } from "@server/handlers/sessionHandlers";

const handler = nc<NextApiRequest, NextApiResponse>().post(login);

export default handler;
