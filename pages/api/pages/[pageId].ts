import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";

import { deletePage, getPage, updatePage } from "@server/handlers/pageHandlers";

const handler = nc<NextApiRequest, NextApiResponse>()
    .get(getPage)
    .post(updatePage)
    .delete(deletePage);

export default handler;
