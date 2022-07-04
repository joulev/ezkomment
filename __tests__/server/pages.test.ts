import * as CommentUtils from "~/server/utils/crud/commentUtils";
import * as PageUtils from "~/server/utils/crud/pageUtils";
import * as SiteUtils from "~/server/utils/crud/siteUtils";
import * as TestUtils from "~/server/utils/testUtils";

const { nonExistingPageId, nonExistingSiteId, nonExistingUid } = nonExistingIds;

describe("Test page utils", () => {
    const uid = TestUtils.randomUUID();
    const siteId = TestUtils.randomUUID();
    const [pageId1, pageId2, ...restPageIds] = Array.from({ length: 5 }, TestUtils.randomUUID);
    const pageTitle = "Eternal Knowledge";
    const mainSite = TestUtils.createTestSite({
        uid,
        id: siteId,
        pageCount: 5,
        totalCommentCount: 5,
    });
    const mainPage = TestUtils.createTestPage({ uid, siteId, id: pageId1, title: pageTitle });

    const commentIds = Array.from({ length: 5 }, TestUtils.randomUUID);

    beforeAll(async () => {
        await TestUtils.importFirestoreEntities({
            sites: [mainSite], // do not forget to create the site
            pages: [
                mainPage,
                TestUtils.createTestPage({ uid, siteId, id: pageId2, totalCommentCount: 5 }),
                ...restPageIds.map(id => TestUtils.createTestPage({ uid, siteId, id })),
            ],
            comments: commentIds.map(id =>
                TestUtils.createTestComment({ siteId, pageId: pageId2, id })
            ),
        });
    });

    ///////////////////
    // SHOULD REJECT //
    ///////////////////

    it("Should fail when trying to create a new page with a non-existing site", async () => {
        await expect(
            PageUtils.createPage(uid, {
                url: "https://en.touhouwiki.net/wiki/Flandre_Scarlet",
                autoApprove: false,
                title: "Who Killed U.N.Owen",
                siteId: nonExistingSiteId,
            })
        ).rejects.toMatchObject({ code: 404 });
    });

    it("Should fail when trying to create a new page with unmatched url", async () => {
        await expect(
            PageUtils.createPage(uid, {
                url: "https://EoSD.com/6",
                autoApprove: false,
                title: "Scarlet Devil",
                siteId,
            })
        ).rejects.toMatchObject({ code: 409 });
    });

    it("Should fail when trying to access a non-existing page", async () => {
        const notFound = { code: 404 };
        await Promise.all([
            expect(PageUtils.getPageById(uid, nonExistingPageId)).rejects.toMatchObject(notFound),
            expect(
                PageUtils.updatePageById(uid, nonExistingPageId, {
                    title: "Undefined Fantastic Object",
                })
            ).rejects.toMatchObject(notFound),
            expect(PageUtils.deletePageById(uid, nonExistingPageId)).rejects.toMatchObject(
                notFound
            ),
        ]);
    });

    it("Should fail when uid does not match", async () => {
        const forbidden = { code: 403 };
        await Promise.all([
            expect(PageUtils.getPageById(nonExistingUid, pageId1)).rejects.toMatchObject(forbidden),
            expect(
                PageUtils.updatePageById(nonExistingUid, pageId1, { title: "UFO" })
            ).rejects.toMatchObject(forbidden),
            expect(PageUtils.deletePageById(nonExistingUid, pageId1)).rejects.toMatchObject(
                forbidden
            ),
        ]);
    });

    ////////////////////
    // SHOULD RESOLVE //
    ////////////////////

    it("Should be able to get page's information", async () => {
        await expect(PageUtils.getPageById(uid, pageId1)).resolves.toMatchObject({
            id: pageId1,
            title: pageTitle,
        });
    });

    it("Should be able to get page's information and its comments", async () => {
        const clientPage = await PageUtils.getClientPageById(uid, pageId2);
        expect(clientPage.comments).toHaveLength(5);
    });

    it("Should correctly increment pageCount when a page is created", async () => {
        await PageUtils.createPage(uid, {
            siteId,
            url: `${mainSite.domain}/Scarlet_Serenade`,
            title: "Scarlet Serenade",
            autoApprove: true,
        });
        const { pageCount } = await SiteUtils.getSiteById(uid, siteId);
        expect(pageCount).toEqual(6);
    });

    it("Should delete page correctly", async () => {
        await PageUtils.deletePageById(uid, pageId1);
        await Promise.all([
            expect(PageUtils.listSitePagesById(siteId)).resolves.toEqual(
                expect.not.arrayContaining([mainPage])
            ),
            expect(SiteUtils.getSiteById(uid, siteId)).resolves.toMatchObject({ pageCount: 5 }),
        ]);
    });

    it("Should be able to delete ALL pages of a site", async () => {
        await PageUtils.deleteSitePagesById(siteId, true);
        await Promise.all([
            expect(PageUtils.listSitePagesById(siteId)).resolves.toHaveLength(0),
            expect(CommentUtils.listPageCommentsById(pageId2)).resolves.toHaveLength(0),
            expect(SiteUtils.getSiteById(uid, siteId)).resolves.toMatchObject({
                pageCount: 0,
                totalCommentCount: 0,
                pendingCommentCount: 0,
            }),
        ]);
    });

    afterAll(async () => {
        await SiteUtils.deleteUserSitesById(uid);
    });
});
