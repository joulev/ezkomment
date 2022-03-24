import type { NextApiHandler } from "next";

const handler: NextApiHandler = (req, res) => {
    const json = require("@client/sample/pages");
    res.status(200).json(json);
};

export default handler;
