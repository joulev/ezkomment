import { createTestSite } from "~/config/generateTestEntities";

import * as PageUtils from "~/server/utils/crud/pageUtils";
import * as SiteUtils from "~/server/utils/crud/siteUtils";

import * as samplePages from "~/sample/server/pages.json";
import * as sampleSites from "~/sample/server/sites.json";
import { nonExistingSiteId } from "~/sample/server/nonExistingIds.json";

describe("Test site interaction", () => {
    const TEST_ID = 1;
    const sampleSite = sampleSites[TEST_ID];

    const existingUid = sampleSite.uid;
    const existingSiteId = sampleSite.id;
    const existingSiteName = sampleSite.name;

    const extraSiteId = `extra${existingSiteId}`;

    beforeAll(async () => {
        await Promise.all([
            SiteUtils.importSites(sampleSite, createTestSite(existingUid, extraSiteId)),
            PageUtils.importPages(samplePages[TEST_ID]),
        ]);
    });

    it(`Should fail when trying to get a non-existing site`, async () => {
        await expect(SiteUtils.getSiteById(nonExistingSiteId)).rejects.toBeTruthy();
    });

    it(`Should fail when trying to create a new site with duplicated name`, async () => {
        await expect(
            SiteUtils.createSite({
                uid: existingUid,
                name: existingSiteName,
                domain: "https://en.touhouwiki.net/wiki/Yukari_Yakumo",
            })
        ).rejects.toBeTruthy();
    });

    it(`Should fail when trying to update a site with duplicated name`, async () => {
        await expect(
            SiteUtils.updateSiteById(extraSiteId, { name: existingSiteName })
        ).rejects.toBeTruthy();
    });

    it(`Should be able to delete site's pages and site's comments`, async () => {
        await PageUtils.deleteSitePagesById(existingSiteId);
        await expect(PageUtils.getPageById(samplePages[1].id)).rejects.toBeTruthy();
    });

    it(`Should be able to delete site`, async () => {
        await SiteUtils.deleteSiteById(existingSiteId);
        await expect(SiteUtils.listUserBasicSitesById(existingUid)).resolves.toEqual(
            expect.not.arrayContaining([existingSiteId])
        );
    });

    afterAll(async () => {
        await SiteUtils.deleteSiteById(extraSiteId);
    });
});
