import { execSync } from "child_process";
import { readFile, readFileSync } from "fs";
import { parse as JSON5Parse } from "json5";
import { join } from "path";

import { DocsData, NavData, SectionData } from "@client/types/docs.type";

const docsDir = join(process.cwd(), "..", "..", "docs");

/**
 * @see /docs/nav.json5
 */
export const navData = JSON5Parse<NavData>(readFileSync(join(docsDir, "nav.json5"), "utf8"));

/**
 * @example
 * ```
 * [
 *   ["getting-started"], // note that .md is omitted
 *   ["basic-features", "pages"],
 *   // ...
 * ]
 * ```
 */
export const filePaths = Object.entries(navData)
    .map(([topLevelName, data]) =>
        typeof data === "string"
            ? topLevelName
            : Object.entries(data.pages).map(
                  ([secondLevelName, _]) => `${topLevelName}/${secondLevelName}`
              )
    )
    .flat(1)
    .map(path => path.split("/"));

/**
 * Read a file from the `/docs` directory
 *
 * @param fileName The path of the file to read as an array (from `getFiles`). Doesn't include file
 * extension, and it will be treated as a `.md` file.
 *
 * @returns An object containing file content and last committed date according to `git`.
 *
 * @example
 * ```
 * const data = getFileData([ "basic-features", "pages" ]);
 * // gives
 * {
 *   // /path/to/docs/basic-features/pages.md
 *   content: "The content of the file",
 *   lastModified: 1234234123 // Unix timestamp to milliseconds,
 * }
 * ```
 */
export async function getFileData(fileName: string[]): Promise<DocsData> {
    const filePath = `docs/${fileName.join("/")}.md`;
    const fillFilePath = join(docsDir, ...fileName) + ".md";
    const data = navData[fileName[0]];
    const ghFetch = await fetch(
        `https://api.github.com/repos/joulev/ezkomment/commits?path=${encodeURIComponent(
            filePath
        )}&page=1&per_page=1`,
        {
            headers: {
                Authorization: `token ${process.env.GH_TOKEN}`,
                Accept: "application/vnd.github.v3+json",
            },
        }
    );
    return {
        title: typeof data === "string" ? data : `${data.sectionTitle}: ${data.pages[fileName[1]]}`,
        content: readFileSync(fillFilePath, "utf8").trim(),
        lastModified: ghFetch.ok
            ? ((await ghFetch.json())[0].commit.committer.date as string)
            : "unknown",
    };
}
