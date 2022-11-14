import docs from "~/docs/cache.json";
import { createHandler, createRouter } from "~/server/next-connect";
import docsSearch from "~/server/utils/docs-search";

export type Data = {
    source: string;
    title: string;
    matchCount: number;
    preview: {
        text: string;
        highlight: boolean;
    }[];
}[];

const router = createRouter<Data>();

router.get((req, res) => {
    const query = req.query.query as string | undefined;
    if (!query) return res.status(400).json({ error: "Missing query" });
    res.status(200).json(docsSearch(docs, query.split(" ")));
});

export default createHandler(router);
