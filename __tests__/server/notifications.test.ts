import * as CommentUtils from "~/server/utils/crud/commentUtils";
import * as NotificationUtils from "~/server/utils/crud/notificationUtils";
import * as TestUtils from "~/server/utils/testUtils";
import { deleteUserSites } from "~/server/utils/crud/userUtils";

const { nonExistingPageId } = testOnly.nonExistingIds;

describe("Test notification utils", () => {
    const uid = TestUtils.randomUUID();
    const siteId = TestUtils.randomUUID();
    const pageId = TestUtils.randomUUID();

    const mainSite = TestUtils.createTestSite({ uid, id: siteId, pageCount: 1 });
    const mainPage = TestUtils.createTestPage({ uid, siteId, id: pageId });

    beforeAll(async () => {
        TestUtils.importFirestoreEntities({
            sites: [mainSite],
            pages: [mainPage],
        });
    });

    ///////////////////
    // SHOULD REJECT //
    ///////////////////

    it("Should fail when trying to delete a non-existing notification", async () => {
        await expect(
            NotificationUtils.deleteNotificationWithUid(uid, nonExistingPageId)
        ).rejects.toMatchObject({ code: 404 });
    });

    ////////////////////
    // SHOULD RESOLVE //
    ////////////////////

    it("Should create new notification correctly", async () => {
        await CommentUtils.createComment({
            pageId,
            author: "Seiran",
            text: "The Rabbit Has Landed",
        });
        let notifications = await NotificationUtils.listUserNotifications(uid);
        expect(notifications).toHaveLength(1);
        expect(notifications[0]).toMatchObject({
            id: pageId,
            authors: ["Seiran"],
            siteName: mainSite.name,
            pageTitle: mainPage.title,
        });
        await CommentUtils.createComment({
            pageId,
            author: "Seiran",
            text: "Unforgettable, the Nostalgic Greenery",
        });
        notifications = await NotificationUtils.listUserNotifications(uid);
        expect(notifications).toHaveLength(1);
        await CommentUtils.createComment({
            pageId,
            author: "Kaguya Houraisan",
            text: "Flight of the Bamboo Cutter ~ Lunatic Princess",
        });
        expect(notifications).toHaveLength(2);
    });

    it("Should delete all notification correctly", async () => {
        await NotificationUtils.deleteUserNotifications(uid);
        await expect(NotificationUtils.listUserNotifications(uid)).resolves.toHaveLength(0);
    });

    afterAll(async () => {
        await deleteUserSites(uid);
    });
});
