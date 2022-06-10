import setupMediaViewport from "~/client/lib/tests/setupMediaViewport";

describe("Test setup functions `setupMediaViewport` and `queryMatchesCurrentWidth`", () => {
    it("Never thought I'd see a test for another test", () => {
        setupMediaViewport(800);
        expect(window.matchMedia("hello").matches).toBeFalsy();
        expect(window.matchMedia("(min-width: 800px)").matches).toBeTruthy();
        expect(window.matchMedia("(min-width: 801px)").matches).toBeFalsy();
    });
});
