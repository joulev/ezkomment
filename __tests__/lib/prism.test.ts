/**
 * @jest-environment node
 */
import { highlight, languages } from "prismjs";

import prism from "~/lib/client/prism";

const code = `const getBreakpoint = (): Breakpoint =>
typeof window === "undefined" || !theme.screens
    ? "unknown"
    : (Object.entries({ xs: "0px", ...theme.screens }) as [Breakpoint, string][])
          .reverse()
          .find(([_, width]) => window.matchMedia(\`(min-width: \${width})\`).matches)![0];`;
const defaultRender = highlight(code, languages.javascript, "javascript");

describe("Test prism function", () => {
    it("Default render", () => {
        expect(prism(code, { language: "javascript" })).toEqual(defaultRender);
    });

    it("With `lineNumberFrom`", () => {
        expect(prism(code, { language: "javascript", lineNumberFrom: 1 })).toMatchSnapshot();
        expect(prism(code, { language: "javascript", lineNumberFrom: 8 })).toMatchSnapshot();
    });

    it("With `highlighted`", () => {
        expect(prism(code, { language: "javascript", highlighted: [2, 3, 4] })).toMatchSnapshot();
        expect(
            prism(code, { language: "javascript", lineNumberFrom: 8, highlighted: [8, 11] })
        ).toMatchSnapshot();
    });
});
