import * as CommentUtils from "~/server/utils/crud/commentUtils";
import * as PageUtils from "~/server/utils/crud/pageUtils";
import * as SiteUtils from "~/server/utils/crud/siteUtils";
import * as TestUtils from "~/server/utils/testUtils";

const { nonExistingCommentId, nonExistingPageId } = testOnly.nonExistingIds;

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
    const mainComment = TestUtils.createTestComment({
        siteId,
        pageId,
        id: commentId,
        status: "Approved",
    });

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

    it("Should fail when trying to create a comment with a non-existing page", async () => {
        await expect(
            CommentUtils.createComment({
                pageId: nonExistingPageId,
                author: null,
                text: "Why Touhou is so hard??",
            })
        ).rejects.toMatchObject({ code: 404 });
    });

    it("Should fail when trying to update an approved comment", async () => {
        await expect(
            CommentUtils.updateComment(commentId, { status: "Approved" })
        ).rejects.toMatchObject({ code: 409 });
    });

    it("Should fail when trying to access a non-existing comment", async () => {
        const notFound = { code: 404 };
        await Promise.all([
            expect(
                CommentUtils.updateComment(nonExistingCommentId, {
                    status: "Approved",
                })
            ).rejects.toMatchObject(notFound),
            expect(CommentUtils.deleteComment(nonExistingCommentId)).rejects.toMatchObject(
                notFound
            ),
        ]);
    });

    ////////////////////
    // SHOULD RESOLVE //
    ////////////////////

    it("Should create and delete a new comment correctly when auto approve is enabled", async () => {
        const { status, id } = await CommentUtils.createComment({
            pageId,
            author: null,
            text: "Idolatrize World",
        });
        expect(status).toEqual("Approved");
        await Promise.all([
            expect(PageUtils.getPageWithUid(uid, pageId)).resolves.toMatchObject({
                totalCommentCount: 6,
                pendingCommentCount: 0,
            }),
            expect(SiteUtils.getSiteWithUid(uid, siteId)).resolves.toMatchObject({
                totalCommentCount: 6,
                pendingCommentCount: 0,
            }),
        ]);
        await CommentUtils.deleteComment(id);
        await Promise.all([
            expect(PageUtils.getPageWithUid(uid, pageId)).resolves.toMatchObject({
                totalCommentCount: 5,
                pendingCommentCount: 0,
            }),
            expect(SiteUtils.getSiteWithUid(uid, siteId)).resolves.toMatchObject({
                totalCommentCount: 5,
                pendingCommentCount: 0,
            }),
        ]);
    });

    it("Should create, update and delete a new comment correctly when auto approve is disabled (the comment was approved)", async () => {
        await PageUtils.updatePageWithUid(uid, pageId, { autoApprove: false });
        const { status, id } = await CommentUtils.createComment({
            pageId,
            author: null,
            text: "Black Princess",
        });
        expect(status).toEqual("Pending");
        await Promise.all([
            expect(PageUtils.getPageWithUid(uid, pageId)).resolves.toMatchObject({
                totalCommentCount: 6,
                pendingCommentCount: 1,
            }),
            expect(SiteUtils.getSiteWithUid(uid, siteId)).resolves.toMatchObject({
                totalCommentCount: 6,
                pendingCommentCount: 1,
            }),
        ]);
        await CommentUtils.updateComment(id, { status: "Approved" });
        await Promise.all([
            expect(PageUtils.getPageWithUid(uid, pageId)).resolves.toMatchObject({
                totalCommentCount: 6,
                pendingCommentCount: 0,
            }),
            expect(SiteUtils.getSiteWithUid(uid, siteId)).resolves.toMatchObject({
                totalCommentCount: 6,
                pendingCommentCount: 0,
            }),
        ]);
        await CommentUtils.deleteComment(id);
        await Promise.all([
            expect(PageUtils.getPageWithUid(uid, pageId)).resolves.toMatchObject({
                totalCommentCount: 5,
                pendingCommentCount: 0,
            }),
            expect(SiteUtils.getSiteWithUid(uid, siteId)).resolves.toMatchObject({
                totalCommentCount: 5,
                pendingCommentCount: 0,
            }),
        ]);
    });

    it("Should create and delete a new comment correctly when auto approve is disabled (the comment was not approved)", async () => {
        const { status, id } = await CommentUtils.createComment({
            pageId,
            author: null,
            text: "Black Princess",
        });
        expect(status).toEqual("Pending");
        await CommentUtils.deleteComment(id);
        await Promise.all([
            expect(PageUtils.getPageWithUid(uid, pageId)).resolves.toMatchObject({
                totalCommentCount: 5,
                pendingCommentCount: 0,
            }),
            expect(SiteUtils.getSiteWithUid(uid, siteId)).resolves.toMatchObject({
                totalCommentCount: 5,
                pendingCommentCount: 0,
            }),
        ]);
    });

    it("Should be able to delete ALL comments of a page", async () => {
        await PageUtils.deletePageComments(pageId);
        await expect(PageUtils.listPageComments(pageId)).resolves.toHaveLength(0);
    });

    afterAll(async () => {
        await SiteUtils.deleteUserSitesById(uid);
    });
});
