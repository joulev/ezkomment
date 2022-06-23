import * as CommentUtils from "~/server/utils/crud/commentUtils";
import * as PageUtils from "~/server/utils/crud/pageUtils";
import * as SiteUtils from "~/server/utils/crud/siteUtils";
import * as TestUtils from "~/server/utils/testUtils";

import { nonExistingPageId, nonExistingSiteId } from "~/sample/server/nonExistingIds.json";

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

    it(`Should fail when trying to get a non-existing page`, async () => {
        await expect(PageUtils.getPageById(uid, nonExistingPageId)).rejects.toMatchObject({
            code: 404,
        });
    });

    it(`Should fail when trying to create a new page with a non-existing site`, async () => {
        await expect(
            PageUtils.createPage(uid, {
                url: "https://en.touhouwiki.net/wiki/Flandre_Scarlet",
                autoApprove: false,
                title: "Necrofantasia",
                siteId: nonExistingSiteId,
            })
        ).rejects.toMatchObject({ code: 404 });
    });

    it(`Should fail when trying to create a new page with unmatched url`, async () => {
        await expect(
            PageUtils.createPage(uid, {
                url: "https://EoSD.com/6",
                autoApprove: false,
                title: "Scarlet Devil",
                siteId,
            })
        ).rejects.toMatchObject({ code: 409 });
    });

    it(`Should fail when trying to update a non-exsting page`, async () => {
        await expect(
            PageUtils.updatePageById(uid, nonExistingPageId, { autoApprove: false })
        ).rejects.toMatchObject({ code: 404 });
    });

    it(`Should fail when trying to delete a non-existing page`, async () => {
        await expect(PageUtils.deletePageById(uid, nonExistingPageId)).rejects.toMatchObject({
            code: 404,
        });
    });

    ////////////////////
    // SHOULD RESOLVE //
    ////////////////////

    it(`Should be able to get page's information`, async () => {
        await expect(PageUtils.getPageById(uid, pageId1)).resolves.toMatchObject({
            id: pageId1,
            title: pageTitle,
        });
    });

    it(`Should correctly increment pageCount when a page is created`, async () => {
        await PageUtils.createPage(uid, {
            siteId,
            url: `${mainSite.domain}/Scarlet_Serenade`,
            title: "Scarlet Serenade",
            autoApprove: true,
        });
        const { pageCount } = await SiteUtils.getSiteById(uid, siteId);
        expect(pageCount).toEqual(6);
    });

    it(`Should delete page correctly`, async () => {
        await PageUtils.deletePageById(uid, pageId1);
        await Promise.all([
            expect(PageUtils.listSitePagesById(siteId)).resolves.toEqual(
                expect.not.arrayContaining([mainPage])
            ),
            expect(SiteUtils.getSiteById(uid, siteId)).resolves.toMatchObject({ pageCount: 5 }),
        ]);
    });

    it(`Should be able to delete ALL pages of a site`, async () => {
        await PageUtils.deleteSitePagesById(siteId);
        await Promise.all([
            expect(PageUtils.listSitePagesById(siteId)).resolves.toHaveLength(0),
            expect(CommentUtils.listPageCommentsById(pageId2)).resolves.toHaveLength(0),
        ]);
    });

    afterAll(async () => {
        await SiteUtils.deleteUserSitesById(uid);
    });
});
