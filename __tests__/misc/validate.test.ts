import { COMMENT, PAGE, SITE, USER } from "~/misc/validate";

describe("Test user validation", () => {
    it("Check displayNameIsValid", () => {
        expect(USER.displayNameIsValid("")).toBe(false);
        expect(USER.displayNameIsValid("a")).toBe(true);
        expect(USER.displayNameIsValid("a b")).toBe(true);
    });
});

describe("Test site validation", () => {
    it("Check nameIsValid", () => {
        expect(SITE.nameIsValid("")).toBe(false);
        expect(SITE.nameIsValid("ab")).toBe(false);
        expect(SITE.nameIsValid("abd")).toBe(true);
        expect(SITE.nameIsValid("abcd-efgh")).toBe(true);
        expect(SITE.nameIsValid("a--b")).toBe(false);
        expect(SITE.nameIsValid("a-b")).toBe(true);
        expect(SITE.nameIsValid("a-b-c")).toBe(true);
        expect(SITE.nameIsValid("a-b-")).toBe(false);
    });
    it("Check domainIsValid", () => {
        expect(SITE.domainIsValid("")).toBe(false);
        expect(SITE.domainIsValid("*")).toBe(true);
        expect(SITE.domainIsValid("google.com")).toBe(true);
        expect(SITE.domainIsValid("with-dash.com")).toBe(true);
        expect(SITE.domainIsValid("a.very.long.and.non.existent.domain.name")).toBe(true);
        expect(SITE.domainIsValid("https://with-protocol.com")).toBe(false);
        expect(SITE.domainIsValid("*.with-wildcard.com")).toBe(false);
        expect(SITE.domainIsValid("with-path.com/hello")).toBe(false);
    });
    it("Check uidIsValid", () => {
        expect(SITE.uidIsValid("")).toBe(false);
        expect(SITE.uidIsValid("a")).toBe(true);
        expect(SITE.uidIsValid("a b")).toBe(false);
    });
    it("Check iconURLIsValid", () => {
        expect(SITE.iconURLIsValid("")).toBe(false);
        expect(SITE.iconURLIsValid("example.com/icon")).toBe(false);
        expect(SITE.iconURLIsValid("httttttps://example.com/icon")).toBe(false);
        // Author: GitHub Copilot
        expect(SITE.iconURLIsValid("https://example.com/icon")).toBe(true);
        expect(SITE.iconURLIsValid("https://example.com/icon?foo=bar")).toBe(true);
        expect(SITE.iconURLIsValid("https://example.com/icon#foo")).toBe(true);
        expect(SITE.iconURLIsValid("https://example.com/icon?foo=bar#foo")).toBe(true);
        expect(SITE.iconURLIsValid("https://example.com/icon?foo=bar#foo?bar=baz")).toBe(true);
    });
});

describe("Test page validation", () => {
    it("Check nameIsValid", () => {
        expect(PAGE.titleIsValid("")).toBe(false);
        expect(PAGE.titleIsValid("a")).toBe(true);
        expect(PAGE.titleIsValid("a b")).toBe(true);
    });
    it("Check urlIsValid", () => {
        expect(PAGE.urlIsValid("")).toBe(false);
        expect(PAGE.urlIsValid("example.com/icon")).toBe(false);
        expect(PAGE.urlIsValid("httttttps://example.com/icon")).toBe(false);
        expect(PAGE.urlIsValid("https://example.com/icon")).toBe(true);
    });
    it("Check siteIdIsValid", () => {
        expect(PAGE.siteIdIsValid("")).toBe(false);
        expect(PAGE.siteIdIsValid("a")).toBe(true);
        expect(PAGE.siteIdIsValid("a b")).toBe(false);
        expect(PAGE.siteIdIsValid("functor/applicative/monad")).toBe(false);
        expect(PAGE.siteIdIsValid(".")).toBe(false);
        expect(PAGE.siteIdIsValid("..")).toBe(false);
        expect(PAGE.siteIdIsValid("__if-name-main__")).toBe(false);
    });
});

describe("Test comment validation", () => {
    it("Check textIsValid", () => {
        expect(COMMENT.textIsValid("")).toBe(false);
        expect(COMMENT.textIsValid("a")).toBe(true);
        expect(COMMENT.textIsValid("a b")).toBe(true);
    });
    it("Check authorIsValid", () => {
        expect(COMMENT.authorIsValid("")).toBe(false);
        expect(COMMENT.authorIsValid("a")).toBe(true);
        expect(COMMENT.authorIsValid("a b")).toBe(true);
    });
    it("Check pageIdIsValid", () => {
        expect(COMMENT.pageIdIsValid("")).toBe(false);
        expect(COMMENT.pageIdIsValid("a")).toBe(true);
        expect(COMMENT.pageIdIsValid("a b")).toBe(false);
        expect(COMMENT.pageIdIsValid("functor/applicative/monad")).toBe(false);
        expect(COMMENT.pageIdIsValid(".")).toBe(false);
        expect(COMMENT.pageIdIsValid("..")).toBe(false);
        expect(COMMENT.pageIdIsValid("__if-name-main__")).toBe(false);
    });
});
