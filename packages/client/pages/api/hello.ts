import hello from "@ezkomment/server/utils/hello";
import { NextApiHandler } from "next";

const handler: NextApiHandler = (_, res) => {
    res.status(200).json({ message: hello() });
};

export default handler;
