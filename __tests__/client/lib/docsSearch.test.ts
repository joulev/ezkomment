/**
 * @jest-environment node
 */
import docsSearch from "~/client/lib/docsSearch";

jest.mock("escape-string-regexp", () => jest.fn((str: string) => str));

describe("Test searching on one documentation file only", () => {
    const docs = [
        {
            source: "/path/hello-world",
            title: "Hello World",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        },
    ];
    it("Should get correct matchCount", () => {
        const result = docsSearch(docs, ["ipsu", "psum"]);
        expect(result[0].matchCount).toBe(2);
    });
    it("Should be case insensitive", () => {
        const result = docsSearch(docs, ["IPSUM"]);
        expect(result[0].matchCount).toBe(1);
    });
    it("Should catch all matches", () => {
        const result = docsSearch(docs, ["it"]);
        expect(result[0].matchCount).toBe(2);
    });
    it("Should get correct preview", () => {
        const result = docsSearch(docs, ["ipsu", "psum"]);
        expect(result[0].preview).toEqual([
            { highlight: false, text: "Lorem " },
            { highlight: true, text: "ipsum" },
            { highlight: false, text: " dolor sit amet, consectetur adipiscing elit." },
        ]);
    });
    it("Should still get correct preview when match is at the start/end of the file", () => {
        const result1 = docsSearch(docs, ["lorem"], { leftMargin: 10, previewLength: 20 });
        expect(result1[0].preview).toEqual([
            { highlight: true, text: "Lorem" },
            { highlight: false, text: " ipsum dolor si…" },
        ]);
        const result2 = docsSearch(docs, ["elit."], { leftMargin: 10, previewLength: 20 });
        expect(result2[0].preview).toEqual([
            { highlight: false, text: "…dipiscing " },
            { highlight: true, text: "elit." },
        ]);
    });
    it("Should ignore matches outside of the preview range when generating preview", () => {
        const result = docsSearch(
            [{ source: "", title: "", content: "Lorem ipsum dolor sit amet, consectetur ipsum." }],
            ["ipsum"],
            { leftMargin: 10, previewLength: 20 }
        );
        expect(result[0].preview).toEqual([
            { highlight: false, text: "Lorem " },
            { highlight: true, text: "ipsum" },
            { highlight: false, text: " dolor si…" },
        ]);
    });
    it("Should put horizontal ellipsis correctly", () => {
        const result1 = docsSearch(docs, ["ipsum"], { leftMargin: 10, previewLength: 20 });
        expect(result1[0].preview).toEqual([
            { highlight: false, text: "Lorem " },
            { highlight: true, text: "ipsum" },
            { highlight: false, text: " dolor si…" },
        ]);
        const result2 = docsSearch(docs, ["ipsum"], { leftMargin: 3, previewLength: 1000 });
        expect(result2[0].preview).toEqual([
            { highlight: false, text: "…em " },
            { highlight: true, text: "ipsum" },
            { highlight: false, text: " dolor sit amet, consectetur adipiscing elit." },
        ]);
        const result3 = docsSearch(docs, ["ipsum"], { leftMargin: 3, previewLength: 10 });
        expect(result3[0].preview).toEqual([
            { highlight: false, text: "…em " },
            { highlight: true, text: "ipsum" },
            { highlight: false, text: " d…" },
        ]);
    });
});

describe("Test searching on several documentation files", () => {
    it("Should ignore files with no matches", () => {
        const docs = [
            {
                source: "/path/hello-world",
                title: "Hello World",
                content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            },
            {
                source: "/path/hello-world2",
                title: "Hello World2",
                content: "Lorem i sum dolor sit amet, consectetur adipiscing elit.",
            },
        ];
        const result = docsSearch(docs, ["ipsum"]);
        expect(result.length).toBe(1);
        expect(result[0].source).toBe("/path/hello-world");
    });
    it("Should sort files by matchCount in descending order", () => {
        const docs = [
            {
                source: "/path/hello-world",
                title: "Hello World",
                content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            },
            {
                source: "/path/hello-world2",
                title: "Hello World2",
                content: "Lorem ipsum ipsum ipsum dolor sit amet, consectetur adipiscing elit.",
            },
        ];
        const result = docsSearch(docs, ["ipsum"]);
        expect(result.length).toBe(2);
        expect(result[0].source).toBe("/path/hello-world2");
        expect(result[1].source).toBe("/path/hello-world");
    });
});
