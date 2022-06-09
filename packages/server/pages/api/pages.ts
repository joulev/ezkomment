import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";

import { createPage } from "@server/handlers/pageHandlers";

const handler = nc<NextApiRequest, NextApiResponse>().post(createPage);

export default handler;
