import * as CommentUtils from "~/old/server/utils/crud/commentUtils";
import * as NotificationUtils from "~/old/server/utils/crud/notificationUtils";
import * as TestUtils from "~/old/server/utils/testUtils";
import { deleteUserSites } from "~/old/server/utils/crud/userUtils";

import { NewCommentNotification } from "~/old/types/server";

const { nonExistingPageId } = testOnly.nonExistingIds;

describe("Test notification utils", () => {
    const uid = TestUtils.randomUUID();
    const siteId = TestUtils.randomUUID();
    const pageId1 = TestUtils.randomUUID();
    const pageId2 = TestUtils.randomUUID();

    const mainSite = TestUtils.createTestSite({ uid, id: siteId, pageCount: 1 });
    const mainPage1 = TestUtils.createTestPage({ uid, siteId, id: pageId1 });
    const mainPage2 = TestUtils.createTestPage({ uid, siteId, id: pageId2 });

    beforeAll(async () => {
        TestUtils.importFirestoreEntities({
            sites: [mainSite],
            pages: [mainPage1, mainPage2],
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
            pageId: pageId1,
            author: "Seiran",
            text: "The Rabbit Has Landed",
        });
        let notifications = await NotificationUtils.listUserNotifications(uid);
        expect(notifications).toHaveLength(1);
        expect(notifications[0]).toMatchObject({
            id: pageId1,
            authors: ["Seiran"],
            siteName: mainSite.name,
            pageTitle: mainPage1.title,
        });
        await CommentUtils.createComment({
            pageId: pageId1,
            author: "Seiran",
            text: "Unforgettable, the Nostalgic Greenery",
        });
        notifications = await NotificationUtils.listUserNotifications(uid);
        expect(notifications).toHaveLength(1);
        expect((notifications[0] as NewCommentNotification).authors).toHaveLength(1);
        await CommentUtils.createComment({
            pageId: pageId1,
            author: "Kaguya Houraisan",
            text: "Flight of the Bamboo Cutter ~ Lunatic Princess",
        });
        notifications = await NotificationUtils.listUserNotifications(uid);
        expect(notifications).toHaveLength(1);
        expect((notifications[0] as NewCommentNotification).authors).toHaveLength(2);
        await CommentUtils.createComment({
            pageId: pageId2,
            author: "Eirin Yagokoro",
            text: "Gensoko Millenium ~ History of the Moon",
        });
        notifications = await NotificationUtils.listUserNotifications(uid);
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
