import { NextApiHandler } from "next";

import { generateCommentHTML } from "~/client/lib/generateCommentHTML";

import html from "~/constants/sampleCommentCode";

const handler: NextApiHandler = (_, res) => {
    const generatedHTML = generateCommentHTML(html, "/api/test");
    res.send(generatedHTML);
};

export default handler;
