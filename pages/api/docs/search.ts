import docs from "~/docs/cache.json";

import { ncRouter } from "~/server/utils/nextHandlerUtils";

import docsSearch from "~/client/lib/docsSearch";

const handler = ncRouter().get((req, res) => {
    const query = req.query.query as string | undefined;
    if (!query) return res.status(400).json({ error: "Missing query" });
    res.status(200).json({ message: "Success", data: docsSearch(docs, query.split(" ")) });
});

export default handler;
