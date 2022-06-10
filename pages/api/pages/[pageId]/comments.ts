import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";

import { createPageComment } from "~/server/handlers/pageHandlers";

const hander = nc<NextApiRequest, NextApiResponse>().post(createPageComment);

export default hander;
