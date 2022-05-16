import generateCommentHTML from "@client/lib/generateCommentHTML";
import { all, comment, styles } from "@client/lib/sampleCommentCode";

describe("Test the comment HTML generator", () => {
    it("Should match snapshot", () => {
        const withoutDarkClass = generateCommentHTML(all, comment, styles, false);
        const withDarkClass = generateCommentHTML(all, comment, styles, true);
        expect(withoutDarkClass).toMatchSnapshot();
        expect(withDarkClass).toMatchSnapshot();
        expect(generateCommentHTML(all, comment, styles)).toEqual(withoutDarkClass);
    });
});
