import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";

import { listUserSites } from "~/server/handlers/userHandlers";

const handler = nc<NextApiRequest, NextApiResponse>({
    onError: (err, _, res) => {
        console.error(err);
        res.status(500).json({ error: "Something broke" });
    },
}).get(listUserSites);

export default handler;
