import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";

import { deleteSite, getSite, updateSite } from "~/server/handlers/siteHandlers";
import { removeUpdateSiteRequestProps } from "~/server/middlewares/removeProps";

const handler = nc<NextApiRequest, NextApiResponse>()
    .get(getSite)
    .post(removeUpdateSiteRequestProps, updateSite)
    .delete(deleteSite);

export default handler;
