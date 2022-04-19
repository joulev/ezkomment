import { execSync } from "child_process";
import { readFileSync } from "fs";
import matter from "gray-matter";
import { files as readDirRecursive } from "node-dir";
import { join } from "path";

import { DocsData } from "@client/types/docs.type";

const docsDir = join(process.cwd(), "..", "..", "docs");

/**
 * Get the filename of all `.md` files in the docs directory
 *
 * @returns An array of all the files in the docs directory, each element being another array
 * describing the path to the file. File extensions are removed.
 *
 * @example
 * ```
 * [
 *   [ "filename" ],
 *   [ "subfolder", "filename" ],
 *   ...
 * ]
 * ```
 */
export function getFiles() {
    return readDirRecursive(docsDir, { sync: true })
        .filter(file => file.endsWith(".md"))
        .map(file =>
            file
                .replace(".md", "")
                .replace(docsDir + "/", "")
                .split("/")
        );
}

/**
 * Read a file from the `/docs` directory
 *
 * @param fileName The path of the file to read as an array (from `getFiles`). Doesn't include file
 * extension, and it will be treated as a `.md` file.
 *
 * @returns An object containing file information. It can be passed directly to page props in
 * docs pages.
 *
 * @example
 * ```
 * const data = getFileData([ "basic-features", "pages" ]);
 * // gives
 * {
 *   // /path/to/docs/basic-features/pages.md
 *   content: "The content of the file",
 *   title: "The title of the file as in file frontmatter",
 *   lastModified: 1234234123 // Unix timestamp to milliseconds,
 *   path: ["the file path (the input to this function)"]
 * }
 * ```
 */
export function getFileData(fileName: string[]): DocsData {
    const filePath = join(docsDir, ...fileName) + ".md";
    const { content, data } = matter(readFileSync(filePath, "utf8"));
    return {
        content,
        title: data.title as string,
        lastModified: parseInt(execSync(`git log -1 --format="%ct" ${filePath}`).toString()) * 1000,
        path: fileName,
    };
}
