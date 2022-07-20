/**
 * @jest-environment node
 */
import fs from "fs";
import { join } from "path";

import { filePaths, getFileData, navData } from "~/client/lib/documentation";

jest.mock("fs", () => ({
    readFileSync: jest.fn((fileName: string) =>
        fileName.endsWith("json5")
            ? JSON.stringify({
                  tutorial: {
                      sectionTitle: "Tutorial",
                      pages: {
                          "getting-started": "Getting started",
                      },
                  },
                  "basic-features": {
                      sectionTitle: "Basic features",
                      pages: {
                          "custom-pages": "Custom pages",
                          "custom-renderer": "Custom renderer",
                      },
                  },
              })
            : "The content of the file"
    ),
}));

describe("Test the documentation utility functions", () => {
    it("Should return the correct nav data", () => {
        expect(fs.readFileSync).toHaveBeenCalledWith(join(process.cwd(), "docs/nav.json5"), "utf8");
        expect(navData).toEqual({
            tutorial: {
                sectionTitle: "Tutorial",
                pages: {
                    "getting-started": "Getting started",
                },
            },
            "basic-features": {
                sectionTitle: "Basic features",
                pages: {
                    "custom-pages": "Custom pages",
                    "custom-renderer": "Custom renderer",
                },
            },
        });
    });

    it("filePaths should be correct", () => {
        expect(filePaths).toEqual([
            ["tutorial", "getting-started"],
            ["basic-features", "custom-pages"],
            ["basic-features", "custom-renderer"],
        ]);
    });

    it("getFileData should return the correct data", async () => {
        /** @ts-ignore */
        global.fetch = jest.fn(async (fetchUrl: string) => {
            const url = new URL(fetchUrl);
            const params = new URLSearchParams(url.search);
            const path = params.get("path");
            let date = "some dates";
            switch (path) {
                case "docs/tutorial/getting-started.md":
                    date = "2020-01-01T00:00:00Z";
                    break;
                case "docs/basic-features/custom-pages.md":
                    date = "2020-01-02T00:00:00Z";
                    break;
                default:
                    break;
            }
            return { json: async () => [{ commit: { committer: { date } } }], ok: true };
        });

        const data = await getFileData(["tutorial", "getting-started"]);
        expect(data).toEqual({
            title: "Tutorial: Getting started",
            content: "The content of the file",
            lastModified: "2020-01-01T00:00:00Z",
        });

        const data2 = await getFileData(["basic-features", "custom-pages"]);
        expect(data2).toEqual({
            title: "Basic features: Custom pages",
            content: "The content of the file",
            lastModified: "2020-01-02T00:00:00Z",
        });
    });

    it("Handle case where fetching from GitHub API fails", async () => {
        /** @ts-ignore */
        global.fetch = jest.fn(async () => ({ ok: false, json: async () => [] }));
        const data = await getFileData(["tutorial", "getting-started"]);
        expect(data.lastModified).toBe("unknown");
    });
});
