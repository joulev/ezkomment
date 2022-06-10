import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";

import { createSite } from "~/server/handlers/siteHandlers";
import { removeCreateSiteRequestProps } from "~/server/middlewares/removeProps";

const handler = nc<NextApiRequest, NextApiResponse>().post(
    removeCreateSiteRequestProps,
    createSite
);

export default handler;
