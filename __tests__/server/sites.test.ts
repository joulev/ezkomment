import * as PageUtils from "~/server/utils/crud/pageUtils";
import * as SiteUtils from "~/server/utils/crud/siteUtils";
import * as UserUtils from "~/server/utils/crud/userUtils";
import * as TestUtils from "~/server/utils/testUtils";

const { nonExistingSiteId, nonExistingUid } = testOnly.nonExistingIds;

describe("Test site utils", () => {
    const uid = TestUtils.randomUUID();
    const [siteId1, siteId2, ...restSiteIds] = Array.from({ length: 5 }, TestUtils.randomUUID);
    const siteName = "Bad Apple";
    const mainSite = TestUtils.createTestSite({
        uid,
        id: siteId1,
        name: siteName,
    });

    const pageIds = Array.from({ length: 5 }, TestUtils.randomUUID);
    const commentIds = Array.from({ length: 5 }, TestUtils.randomUUID);
    const pageId = pageIds[0];

    beforeAll(async () => {
        await TestUtils.importFirestoreEntities({
            sites: [
                mainSite,
                TestUtils.createTestSite({ uid, id: siteId2, pageCount: 5, totalCommentCount: 5 }),
                ...restSiteIds.map(id => TestUtils.createTestSite({ uid, id })),
            ],
            pages: pageIds.map(id => TestUtils.createTestPage({ uid, siteId: siteId2, id })),
            comments: commentIds.map(id =>
                TestUtils.createTestComment({ siteId: siteId2, pageId, id })
            ),
        });
    });

    ///////////////////
    // SHOULD REJECT //
    ///////////////////

    it("Should fail when trying to create a new site with duplicated name", async () => {
        await expect(
            SiteUtils.createSiteWithUid(uid, {
                name: siteName,
                domain: "https://en.touhouwiki.net/wiki/Yukari_Yakumo",
                iconURL: null,
            })
        ).rejects.toMatchObject({ code: 409 });
    });

    it("Should fail when trying to update a site with duplicated name", async () => {
        await expect(
            SiteUtils.updateSiteWithUid(uid, siteId2, { name: siteName })
        ).rejects.toMatchObject({ code: 409 });
    });

    it("Should fail when trying to access a non-exisiting site", async () => {
        const notFound = { code: 404 };
        await Promise.all([
            expect(SiteUtils.getSiteWithUid(uid, nonExistingSiteId)).rejects.toMatchObject(
                notFound
            ),
            expect(
                SiteUtils.updateSiteWithUid(uid, nonExistingSiteId, { name: "LoLK" })
            ).rejects.toMatchObject(notFound),
            expect(SiteUtils.deleteSiteWithUid(uid, nonExistingSiteId)).rejects.toMatchObject(
                notFound
            ),
        ]);
    });

    it("Should fail when uid does not match", async () => {
        const forbidden = { code: 403 };

        await Promise.all([
            expect(SiteUtils.getSiteWithUid(nonExistingUid, siteId1)).rejects.toMatchObject(
                forbidden
            ),
            expect(
                SiteUtils.updateSiteWithUid(nonExistingUid, siteId1, { name: "Imperishable Night" })
            ).rejects.toMatchObject(forbidden),
            expect(SiteUtils.deleteSiteWithUid(nonExistingUid, siteId1)).rejects.toMatchObject(
                forbidden
            ),
        ]);
    });

    ////////////////////
    // SHOULD RESOLVE //
    ////////////////////

    it("Should be able to get site's information", async () => {
        await expect(SiteUtils.getSiteWithUid(uid, siteId1)).resolves.toMatchObject(mainSite);
    });

    it("Should be able to get site's information and its pages", async () => {
        const clientSite = await SiteUtils.getClientSiteWithUid(uid, siteId2);
        expect(clientSite.pages).toHaveLength(5);
    });

    it("Should delete site correctly", async () => {
        await SiteUtils.deleteSiteWithUid(uid, siteId1);
        await Promise.all([
            expect(UserUtils.listUserSiteNames(uid)).resolves.toEqual(
                expect.not.arrayContaining([siteId1])
            ),
            expect(UserUtils.listUserSites(uid)).resolves.toEqual(
                expect.not.arrayContaining([mainSite])
            ),
        ]);
    });

    it("Should be able to delete ALL sites of a user", async () => {
        await UserUtils.deleteUserSites(uid);
        /**
         * All site must be deleted,
         * and their pages,
         * and the pages' comments.
         */
        await Promise.all([
            expect(UserUtils.listUserSiteNames(uid)).resolves.toHaveLength(0),
            expect(UserUtils.listUserSites(uid)).resolves.toHaveLength(0),
            expect(SiteUtils.listSitePages(siteId2)).resolves.toHaveLength(0),
            expect(PageUtils.listPageComments(pageId)).resolves.toHaveLength(0),
            expect(SiteUtils.listSiteComments(siteId2)).resolves.toHaveLength(0),
        ]);
    });
});
