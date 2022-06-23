import * as CommentUtils from "~/server/utils/crud/commentUtils";
import * as PageUtils from "~/server/utils/crud/pageUtils";
import * as SiteUtils from "~/server/utils/crud/siteUtils";
import * as TestUtils from "~/server/utils/testUtils";

import { nonExistingCommentId, nonExistingPageId } from "~/sample/server/nonExistingIds.json";

describe("Test comment utils", () => {
    const uid = TestUtils.randomUUID();
    const siteId = TestUtils.randomUUID();
    const pageId = TestUtils.randomUUID();
    const [commentId, ...restCommentIds] = Array.from({ length: 5 }, TestUtils.randomUUID);
    const mainSite = TestUtils.createTestSite({
        uid,
        id: siteId,
        pageCount: 1,
        totalCommentCount: 5,
        pendingCommentCount: 0,
    });
    const mainPage = TestUtils.createTestPage({
        uid,
        siteId,
        id: pageId,
        autoApprove: true,
        totalCommentCount: 5,
        pendingCommentCount: 0,
    });
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

    ///////////////////
    // SHOULD REJECT //
    ///////////////////

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

    ////////////////////
    // SHOULD RESOLVE //
    ////////////////////

    it(`Should create and delete a new comment correctly when auto approve is enabled`, async () => {
        const { status, id } = await CommentUtils.createComment({
            pageId,
            author: null,
            text: "Idolatrize World",
        });
        expect(status).toEqual("Approved");
        await Promise.all([
            expect(PageUtils.getPageById(uid, pageId)).resolves.toMatchObject({
                totalCommentCount: 6,
                pendingCommentCount: 0,
            }),
            expect(SiteUtils.getSiteById(uid, siteId)).resolves.toMatchObject({
                totalCommentCount: 6,
                pendingCommentCount: 0,
            }),
        ]);
        await CommentUtils.deleteCommentById(id);
        await Promise.all([
            expect(PageUtils.getPageById(uid, pageId)).resolves.toMatchObject({
                totalCommentCount: 5,
                pendingCommentCount: 0,
            }),
            expect(SiteUtils.getSiteById(uid, siteId)).resolves.toMatchObject({
                totalCommentCount: 5,
                pendingCommentCount: 0,
            }),
        ]);
    });

    it(`Should create and delete a new comment correctly when auto approve is disabled`, async () => {
        await PageUtils.updatePageById(uid, pageId, { autoApprove: false });
        const { status, id } = await CommentUtils.createComment({
            pageId,
            author: null,
            text: "Black Princess",
        });
        expect(status).toEqual("Pending");
        await Promise.all([
            expect(PageUtils.getPageById(uid, pageId)).resolves.toMatchObject({
                totalCommentCount: 6,
                pendingCommentCount: 1,
            }),
            expect(SiteUtils.getSiteById(uid, siteId)).resolves.toMatchObject({
                totalCommentCount: 6,
                pendingCommentCount: 1,
            }),
        ]);
        await CommentUtils.deleteCommentById(id);
        await Promise.all([
            expect(PageUtils.getPageById(uid, pageId)).resolves.toMatchObject({
                totalCommentCount: 5,
                pendingCommentCount: 0,
            }),
            expect(SiteUtils.getSiteById(uid, siteId)).resolves.toMatchObject({
                totalCommentCount: 5,
                pendingCommentCount: 0,
            }),
        ]);
    });

    it(`Should be able to delete ALL comments of a page`, async () => {
        await CommentUtils.deletePageCommentsById(pageId);
        await expect(CommentUtils.listPageCommentsById(pageId)).resolves.toHaveLength(0);
    });

    afterAll(async () => {
        await SiteUtils.deleteUserSitesById(uid);
    });
});
