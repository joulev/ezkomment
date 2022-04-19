import { execSync } from "child_process";
import { readFileSync } from "fs";
import { files as readDirRecursive } from "node-dir";
import { join } from "path";

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
 * @returns An object containing the file contents and the last modified date (according to `git`).
 *
 * @example
 * ```
 * const data = getFileData([ "basic-features", "pages" ]);
 * // gives
 * {
 *   // /path/to/docs/basic-features/pages.md
 *   content: "The content of the file",
 *   lastModified: 1234234123 // Unix timestamp to milliseconds
 * }
 * ```
 */
export function getFileData(fileName: string[]) {
    const filePath = join(docsDir, ...fileName) + ".md";
    return {
        content: readFileSync(filePath, "utf8"),
        time: parseInt(execSync(`git log -1 --format="%ct" ${filePath}`).toString()) * 1000,
    };
}
