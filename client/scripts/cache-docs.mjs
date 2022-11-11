// @ts-check
import { readFileSync, writeFileSync } from "fs";
import JSON5 from "json5";
import { remark } from "remark";
import strip from "strip-markdown";

const mdProcessor = remark().use(strip);

/** @type {import("../../app/docs/documentation").NavData} */
const navData = JSON5.parse(readFileSync(process.cwd() + "/docs/nav.json5", "utf8"));

/** @param {string} md */
const md2plain = async md => {
    const mdWithHeadingColons = md.replace(/(#{2,6}.*)\n\n/g, "$1:\n\n");
    return String(await mdProcessor.process(mdWithHeadingColons))
        .replace(/.*\n\n/, "") // remove h1
        .replace(/\n\n/g, " ") // make everything to one line
        .replace(/\\/g, "") // strip-markdown adds backslashes. Why?
        .replace(/\n$/, ""); // remove eof new line
};

(async () => {
    const cacheObj = await Promise.all(
        Object.entries(navData)
            .map(([dir, data]) =>
                Object.entries(data.pages).map(([name, pageTitle]) => ({
                    path: `${dir}/${name}`,
                    // bit too specific here
                    title:
                        data.sectionTitle === pageTitle
                            ? pageTitle
                            : `${data.sectionTitle} – ${pageTitle}`,
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
