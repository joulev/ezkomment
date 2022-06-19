import * as SiteUtils from "~/server/utils/crud/siteUtils";

import * as sampleSites from "~/sample/server/sites.json";
import { nonExistingSiteId } from "~/sample/server/nonExistingIds.json";

describe("Test site interaction", () => {
    const sampleSite = sampleSites[1];

    const existingUid = sampleSite.uid;
    const existingSiteName = sampleSite.name;

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
        const { id } = await SiteUtils.createSite({
            uid: existingUid,
            name: "Bad Apple",
            domain: "https://en.touhouwiki.net/wiki/Junko",
        });
        await expect(SiteUtils.updateSiteById(id, { name: existingSiteName })).rejects.toBeTruthy();
    });

    // How to test delete, now?
});
