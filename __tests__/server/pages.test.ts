import * as PageUtils from "~/server/utils/crud/pageUtils";
import * as TestUtils from "~/server/utils/testUtils";

import { nonExistingPageId, nonExistingSiteId } from "~/sample/server/nonExistingIds.json";

describe("Test page utils", () => {
    const siteId = TestUtils.randomUUID();
    const [pageId1, pageId2, ...restPageIds] = Array.from({ length: 5 }, TestUtils.randomUUID);
    const pageName = "Eternal Knowledge";
    const mainSite = TestUtils.createTestSite(TestUtils.randomUUID(), siteId);
    const mainPage = TestUtils.createTestPage(siteId, pageId1, pageName);

    beforeAll(async () => {
        await TestUtils.importFirestoreEntities({
            sites: [mainSite], // do not forget to create the site
            pages: [
                mainPage,
                TestUtils.createTestPage(siteId, pageId2),
                ...restPageIds.map(id => TestUtils.createTestPage(siteId, id)),
            ],
        });
    });

    it(`Should be able to get page's information`, async () => {
        await expect(PageUtils.getPageById(pageId1)).resolves.toMatchObject({
            id: pageId1,
            name: pageName,
            autoApprove: expect.any(Boolean),
        });
    });

    it(`Should fail when trying to get a non-existing page`, async () => {
        await expect(PageUtils.getPageById(nonExistingPageId)).rejects.toMatchObject({ code: 404 });
    });

    it(`Should fail when trying to create a new page with duplicated name`, async () => {
        await expect(
            PageUtils.createPage({
                url: `${mainSite.domain}/Scarlet%2FSerenade`,
                autoApprove: false,
                name: pageName,
                siteId,
            })
        ).rejects.toMatchObject({ code: 409 });
    });

    it(`Should fail when trying to create a new page with a non-existing site`, async () => {
        await expect(
            PageUtils.createPage({
                url: "https://en.touhouwiki.net/wiki/Flandre_Scalet",
                autoApprove: false,
                name: "Necrofantasia",
                siteId: nonExistingSiteId,
            })
        ).rejects.toMatchObject({ code: 404 });
    });

    it(`Should fail when trying to create a new page with unmatched url`, async () => {
        await expect(
            PageUtils.createPage({
                url: "https://EoSD.com/6",
                autoApprove: false,
                name: "Scarlet Devil",
                siteId,
            })
        ).rejects.toMatchObject({ code: 409 });
    });

    it(`Should fail when trying to update a non-exsting page`, async () => {
        await expect(
            PageUtils.updatePageById(nonExistingPageId, { autoApprove: false })
        ).rejects.toMatchObject({ code: 404 });
    });

    it(`Should fail when trying to update a page with duplicated name`, async () => {
        await expect(PageUtils.updatePageById(pageId2, { name: pageName })).rejects.toMatchObject({
            code: 409,
        });
    });

    it(`Should fail when trying to delete a non-existing page`, async () => {
        await expect(PageUtils.deletePageById(nonExistingPageId)).rejects.toMatchObject({
            code: 404,
        });
    });

    it(`Should delete page correctly`, async () => {
        await PageUtils.deletePageById(pageId1);
        await Promise.all([
            expect(PageUtils.listSiteBasicPagesById(siteId)).resolves.toEqual(
                expect.not.arrayContaining([pageId1])
            ),
            expect(PageUtils.listSitePagesById(siteId)).resolves.toEqual(
                expect.not.arrayContaining([mainPage])
            ),
        ]);
    });

    it(`Should be able to delete ALL pages of a site`, async () => {
        await PageUtils.deleteSitePagesById(siteId);
        await Promise.all([
            expect(PageUtils.listSiteBasicPagesById(siteId)).resolves.toHaveLength(0),
            expect(PageUtils.listSitePagesById(siteId)).resolves.toHaveLength(0),
        ]);
    });
});
