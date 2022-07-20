import docs from "~/docs/cache.json";

import { ncRouter } from "~/server/utils/nextHandlerUtils";

import { findMatchInDocContent } from "~/client/lib/docsSearch";

const handler = ncRouter().get((req, res) => {
    const query = req.query.query as string | undefined;
    if (!query) return res.status(400).json({ error: "Missing query" });
    const words = query.split(" ");
    const docsMatches = docs
        .map(doc => findMatchInDocContent(doc, words))
        .filter(({ matchCount }) => matchCount > 0);
    res.status(200).json({ message: "Success", data: docsMatches });
});

export default handler;
