import "server-only";
import { readFileSync } from "fs";
import { parse as JSON5Parse } from "json5";
import { join } from "path";

export type DocsData = {
    title: string;
    content: string;
    lastModified: string;
};
export type SectionData = {
    sectionTitle: string;
    pages: {
        [key: string]: string; // we only go one level deep, and that's intentional
    };
};
export type NavData = {
    [key: string]: SectionData;
};

const docsDir = join(process.cwd(), "docs");

/**
 * @see /docs/nav.json5
 */
export const navData = JSON5Parse<NavData>(readFileSync(join(docsDir, "nav.json5"), "utf8"));

export const filePaths = Object.entries(navData)
    .map(([dir, data]) => Object.entries(data.pages).map(([name, _]) => `${dir}/${name}`))
    .flat(1)
    .map(path => path.split("/"));

export function pathExists(path: string[]) {
    const fullPath = path.join("/");
    return filePaths.some(p => p.join("/") === fullPath);
}

export function getTitle(path: string[]) {
    const data = navData[path[0]];
    return data.pages[path[1]];
}

export function getPrevAndNext(path: string[]) {
    const fullPath = path.join("/");
    const index = filePaths.findIndex(p => p.join("/") === fullPath);
    const prev = filePaths[index - 1];
    const next = filePaths[index + 1];
    return {
        prev: prev ? { path: prev, title: getTitle(prev) } : undefined,
        next: next ? { path: next, title: getTitle(next) } : undefined,
    };
}

export async function getLastModified(fileName: string[]): Promise<string> {
    const filePath = `docs/${fileName.join("/")}.md`;
    const url = new URL("https://api.github.com/repos/joulev/ezkomment/commits");
    url.searchParams.append("path", filePath);
    url.searchParams.append("page", "1");
    url.searchParams.append("per_page", "1");
    const ghFetch = await fetch(url.toString());
    const ghData = (await ghFetch.json()) as any[];
    return ghFetch.ok && ghData.length > 0
        ? (ghData[0].commit.committer.date as string)
        : "unknown";
}
