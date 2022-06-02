import { NextApiHandler } from "next";

import getProjectLogJoulev from "@client/lib/client/orbital/logJoulev";

import { ProjectLog } from "@client/types/utils.type";

/**
 * A wrapper to fetch the project log from Google Sheets. I don't want to expose the Google Sheets
 * REST API path to client side.
 */
const handler: NextApiHandler<ProjectLog> = async (_, res) => res.json(await getProjectLogJoulev());

export default handler;
