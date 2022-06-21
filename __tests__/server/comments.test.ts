import * as CommentUtils from "~/server/utils/crud/commentUtils";
import * as TestUtils from "~/server/utils/testUtils";
import { PAGES_COLLECTION } from "~/server/firebase/firestoreCollections";

import { nonExistingCommentId, nonExistingPageId } from "~/sample/server/nonExistingIds.json";

describe("Test comment utils", () => {
    const siteId = TestUtils.randomUUID();
    const pageId = TestUtils.randomUUID();
    const [commentId, ...restCommentIds] = Array.from({ length: 5 }, TestUtils.randomUUID);
    const mainSite = TestUtils.createTestSite({
        uid: "_",
        id: siteId,
        pageCount: 1,
        totalCommentCount: 5,
    });
    const mainPage = TestUtils.createTestPage({ siteId, id: pageId, totalCommentCount: 5 });
    const mainComment = TestUtils.createTestComment({ siteId, pageId, id: commentId });

    beforeAll(async () => {
        await TestUtils.importFirestoreEntities({
            sites: [mainSite],
            pages: [mainPage],
            comments: [
                mainComment,
                ...restCommentIds.map(id => TestUtils.createTestComment({ siteId, pageId, id })),
            ],
        });
    });

    // Note that we cannot get a single comment

    it(`Should be able to create a new comment correctly`, async () => {
        await expect(
            CommentUtils.createComment({
                pageId,
                author: null,
                text: "Idolatrize World",
            })
        ).resolves.toMatchObject({ status: mainPage.autoApprove ? "Approved" : "Pending" });
    });

    it(`Should fail when trying to create a comment with a non-existing page`, async () => {
        await expect(
            CommentUtils.createComment({
                pageId: nonExistingPageId,
                author: null,
                text: "Suffer",
            })
        ).rejects.toMatchObject({ code: 404 });
    });

    it(`Should fail when trying to update a non-existing comment`, async () => {
        await expect(
            CommentUtils.updateCommentById(nonExistingCommentId, {
                status: "Approved",
            })
        ).rejects.toMatchObject({ code: 404 });
    });

    it(`Should fail when trying to delte a non-existing comment`, async () => {
        await expect(CommentUtils.deleteCommentById(nonExistingCommentId)).rejects.toMatchObject({
            code: 404,
        });
    });

    it(`Should be able to delete ALL comments of a page`, async () => {
        await CommentUtils.deletePageCommentsById(pageId);
        await expect(CommentUtils.listPageCommentsById(pageId)).resolves.toHaveLength(0);
    });
});
