import { readFileSync, writeFileSync } from "fs";
import JSON5 from "json5";
import { remark } from "remark";
import strip from "strip-markdown";

const mdProcessor = remark().use(strip);

/** @type {import("../types/client/docs.type").NavData} */
const navData = JSON5.parse(readFileSync(process.cwd() + "/docs/nav.json5", "utf8"));

/** @param {string} md */
const md2plain = async md =>
    String(await mdProcessor.process(md))
        .replace(/\n\n/g, " ")
        .replace(/\\/g, "")
        .replace(/\n$/, "");

(async () => {
    const cacheObj = await Promise.all(
        Object.entries(navData)
            .map(([dir, data]) =>
                Object.entries(data.pages).map(([name, pageTitle]) => ({
                    path: `${dir}/${name}`,
                    title: `${data.sectionTitle}: ${pageTitle}`,
                }))
            )
            .flat(1)
            .map(async ({ path, title }) => ({
                source: path,
                title,
                content: await md2plain(readFileSync(process.cwd() + `/docs/${path}.md`, "utf8")),
            }))
    );
    writeFileSync(process.cwd() + "/docs/cache.json", JSON.stringify(cacheObj));
})().catch(console.error);
