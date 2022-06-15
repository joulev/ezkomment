import { NextApiHandler } from "next";

import generateCommentHTML from "~/client/lib/generateCommentHTML";

import * as code from "~/constants/sampleCommentCode";

import page from "~/sample/page.json";

const handler: NextApiHandler = (_, res) => {
    const html = generateCommentHTML(code.all, code.comment, code.styles, page.approvedComments);
    res.send(html);
};

export default handler;
