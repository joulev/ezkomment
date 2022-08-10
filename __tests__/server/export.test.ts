import * as ExportUtils from "~/server/utils/crud/exportUtils";
import * as UserUtils from "~/server/utils/crud/userUtils";
import * as TestUtils from "~/server/utils/testUtils";

jest.mock("~/templates/default.html", () => "default template html");

describe("Test export utils", () => {
    const uid = TestUtils.randomUUID();
    const siteId = TestUtils.randomUUID();
    const pageId = TestUtils.randomUUID();
    const commentIds = Array.from({ length: 5 }, TestUtils.randomUUID);

    beforeAll(async () => {
        await Promise.all([
            TestUtils.importUsers(TestUtils.createTestUser(uid)),
            TestUtils.importFirestoreEntities({
                sites: [
                    TestUtils.createTestSite({
                        uid,
                        id: siteId,
                        pageCount: 1,
                        totalCommentCount: 5,
                    }),
                ],
                pages: [
                    TestUtils.createTestPage({ uid, siteId, id: pageId, totalCommentCount: 5 }),
                ],
                comments: commentIds.map(id => TestUtils.createTestComment({ id, siteId, pageId })),
            }),
        ]);
    });

    it("Should export page correctly", async () => {
        const exportedPage = await ExportUtils.exportPageWithUid(uid, pageId);
        expect(exportedPage.comments).toHaveLength(5);
    });

    it("Should export site correctly", async () => {
        const exportedSite = await ExportUtils.exportSiteWithUid(uid, siteId);
        expect(exportedSite.pages).toHaveLength(1);
        expect(exportedSite.pages[0].comments).toHaveLength(5);
    });

    it("Should export user correctly", async () => {
        const exportedUser = await ExportUtils.exportUserById(uid);
        expect(exportedUser.sites).toHaveLength(1);
        expect(exportedUser.sites[0].pages).toHaveLength(1);
        expect(exportedUser.sites[0].pages[0].comments).toHaveLength(5);
    });

    afterAll(async () => {
        await Promise.all([UserUtils.deleteUserById(uid), UserUtils.deleteUserSites(uid)]);
    });
});
