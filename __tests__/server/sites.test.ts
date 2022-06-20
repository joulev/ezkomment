import * as SiteUtils from "~/server/utils/crud/siteUtils";
import * as TestUtils from "~/server/utils/testUtils";

import { nonExistingSiteId } from "~/sample/server/nonExistingIds.json";

describe("Test site utils", () => {
    const uid = TestUtils.randomUUID();
    const [siteId1, siteId2, ...restSiteIds] = Array.from({ length: 5 }, TestUtils.randomUUID);
    const siteName = "Bad Apple";
    const mainSite = TestUtils.createTestSite(uid, siteId1, siteName);

    beforeAll(async () => {
        await TestUtils.importFirestoreEntities({
            sites: [
                mainSite,
                TestUtils.createTestSite(uid, siteId2),
                ...restSiteIds.map(id => TestUtils.createTestSite(uid, id)),
            ],
        });
    });

    it(`Should be able to get site's information`, async () => {
        await expect(SiteUtils.getSiteById(siteId1)).resolves.toMatchObject({
            id: siteId1,
            name: siteName,
        });
    });

    it(`Should fail when trying to get a non-existing site`, async () => {
        await expect(SiteUtils.getSiteById(nonExistingSiteId)).rejects.toMatchObject({ code: 404 });
    });

    it(`Should fail when trying to create a new site with duplicated name`, async () => {
        await expect(
            SiteUtils.createSite({
                uid,
                name: siteName,
                domain: "https://en.touhouwiki.net/wiki/Yukari_Yakumo",
            })
        ).rejects.toMatchObject({ code: 409 });
    });

    it(`Should fail when trying to update a site with duplicated name`, async () => {
        await expect(SiteUtils.updateSiteById(siteId2, { name: siteName })).rejects.toMatchObject({
            code: 409,
        });
    });

    it(`Should fail when trying to update a non-existing site`, async () => {
        await expect(
            SiteUtils.updateSiteById(nonExistingSiteId, { name: siteName })
        ).rejects.toMatchObject({ code: 404 });
    });

    it(`Should fail when trying to delete a non-exisiting site`, async () => {
        await expect(SiteUtils.deleteSiteById(nonExistingSiteId)).rejects.toMatchObject({
            code: 404,
        });
    });

    it(`Should delete site correctly`, async () => {
        await SiteUtils.deleteSiteById(siteId1);
        await Promise.all([
            expect(SiteUtils.listUserBasicSitesById(uid)).resolves.toEqual(
                expect.not.arrayContaining([siteId1])
            ),
            expect(SiteUtils.listUserSitesById(uid)).resolves.toEqual(
                expect.not.arrayContaining([mainSite])
            ),
        ]);
    });

    it(`Should be able to delete ALL sites of a user`, async () => {
        await SiteUtils.deleteUserSitesById(uid);
        await Promise.all([
            expect(SiteUtils.listUserBasicSitesById(uid)).resolves.toHaveLength(0),
            expect(SiteUtils.listUserSitesById(uid)).resolves.toHaveLength(0),
        ]);
    });
});
