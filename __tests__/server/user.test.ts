import * as PageUtils from "~/server/utils/crud/pageUtils";
import * as SiteUtils from "~/server/utils/crud/siteUtils";
import * as UserUtils from "~/server/utils/crud/userUtils";

import * as samplePages from "~/sample/server/pages.json";
import * as sampleSites from "~/sample/server/sites.json";
import * as sampleUsers from "~/sample/server/users.json";
import { nonExistingUid } from "~/sample/server/nonExistingIds.json";

describe("Test user interaction", () => {
    const TEST_ID = 0;
    const existingUid = sampleUsers[TEST_ID].uid;

    beforeAll(async () => {
        await Promise.all([
            UserUtils.importUsers(sampleUsers[TEST_ID]),
            SiteUtils.importSites(sampleSites[TEST_ID]),
            PageUtils.importPages(samplePages[TEST_ID]),
        ]);
    });

    it(`Should fail when trying to get a non-existing user`, async () => {
        expect.assertions(1);
        await expect(UserUtils.getUserById(nonExistingUid)).rejects.toBeTruthy();
    });

    it(`Should be able to get user's sites with basic information`, async () => {
        const data = await SiteUtils.listUserBasicSitesById(existingUid);
        expect(data.length).toBeGreaterThan(0);
        expect(data[0].id).toBeDefined();
    });

    ////////////
    // UPDATE //
    ////////////

    it(`Should be able to update user`, async () => {
        expect.assertions(1);
        await expect(
            UserUtils.updateUserById(existingUid, { photoURL: "https://example.com" })
        ).resolves.toBeTruthy();
    });

    ////////////
    // DELETE //
    ////////////

    it(`Should be able to remove ALL information about user`, async () => {
        await SiteUtils.deleteUserSitesById(existingUid);
        // ALL sites and pages should be removed
        await Promise.all([
            expect(SiteUtils.listUserBasicSitesById(existingUid)).resolves.toEqual([]),
            expect(SiteUtils.getSiteById(sampleSites[0].id)).rejects.toBeTruthy(),
            expect(PageUtils.getPageById(samplePages[0].id)).rejects.toBeTruthy(),
        ]);
    });

    afterAll(async () => {
        await UserUtils.deleteUserById(existingUid);
    });
});
