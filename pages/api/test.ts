import { NextApiHandler } from "next";
import rehypePresetMinify from "rehype-preset-minify";
import rehypeStringify from "rehype-stringify";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";

const comments: { author: string; text: string; date: string }[] = [];

async function md2html(md: string) {
    const processor = unified()
        .use(remarkParse)
        .use(remarkRehype)
        .use(rehypePresetMinify)
        .use(rehypeStringify);
    return String(await processor.process(md));
}

const handler: NextApiHandler = async (req, res) => {
    if (req.method === "GET")
        return res.json(
            await Promise.all(
                comments.map(async ({ author, text, date }) => ({
                    author,
                    text: await md2html(text),
                    date,
                }))
            )
        );

    if (req.method === "POST") {
        const { author, text } = req.body;
        const date = new Date().toISOString();
        comments.push({ author, text, date });
        return res.end();
    }

    res.status(405).end();
};

export default handler;
