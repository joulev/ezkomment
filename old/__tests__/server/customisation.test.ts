import * as CustomisationUtils from "~/old/server/utils/crud/customisationUtils";
import * as SiteUtils from "~/old/server/utils/crud/siteUtils";
import * as TestUtils from "~/old/server/utils/testUtils";
import { SITES_COLLECTION } from "~/old/server/firebase/firestoreCollections";

import { SiteCustomisation, UpdateSiteCustomisationBodyParams } from "~/old/types/server";

jest.mock("~/templates/default.html", () => "default template html");

describe("Test customisation utils", () => {
    const uid = TestUtils.randomUUID();
    const siteId = TestUtils.randomUUID();
    const mainSite = TestUtils.createTestSite({
        uid,
        id: siteId,
    });
    beforeAll(async () => {
        await TestUtils.importFirestoreEntities({
            sites: [mainSite],
        });
    });

    it("Should return default customisation when the feature is not used", async () => {
        const defaultCustomisation: SiteCustomisation = {
            customisation: "default template html",
        };
        await expect(CustomisationUtils.getSiteCustomisation(siteId)).resolves.toMatchObject(
            defaultCustomisation
        );
    });

    it("Should be able to upload new customisation", async () => {
        const newCustomisation: UpdateSiteCustomisationBodyParams = {
            customisation: "Some customisation",
        };
        await CustomisationUtils.updateSiteCustomisation(uid, siteId, newCustomisation);
        await expect(CustomisationUtils.getSiteCustomisation(siteId)).resolves.toMatchObject(
            newCustomisation
        );
    });

    it("Should delete customisation when delete site", async () => {
        await SiteUtils.deleteSiteWithUid(uid, siteId);
        const siteCustomisationRef = SITES_COLLECTION.doc(siteId)
            .collection("customisation")
            .doc("CUSTOMISATION");
        await expect(siteCustomisationRef.get()).resolves.toMatchObject({ exists: false });
    });
});
