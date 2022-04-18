import { files as readDirRecursive } from "node-dir";
import { join } from "path";

const docsDir = join(process.cwd(), "..", "..", "docs");

/**
 * Get the filename of all .md files in the docs directory
 *
 * @returns An array of all the files in the docs directory, each element being another array
 * describing the path to the file.
 */
export function getFiles() {
    const files = readDirRecursive(docsDir, { sync: true })
        .filter(file => file.endsWith(".md"))
        .map(file => file.replace(".md", ""))
        .map(file => file.replace(docsDir + "/", ""))
        .map(path => path.split("/"));
    return files;
}
