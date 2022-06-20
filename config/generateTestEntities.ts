import { UserImportRecord } from "firebase-admin/auth";
import { Timestamp } from "firebase-admin/firestore";
import { writeFileSync } from "fs";

import { Comment, Page, Site } from "~/types/server";

/**
 * Sample users
 */

export function createTestUser(uid: string): UserImportRecord {
    return {
        uid,
        displayName: `User ${uid}`,
        email: `example${uid}@email.com`,
    };
}

/**
 * create site for testing.
 */
export function createTestSite(uid: string, siteId: string): Site {
    return {
        id: siteId,
        name: `Site ${siteId}`,
        domain: `example${siteId}.com`,
        iconURL: null,
        uid,
    };
}

export function createTestPage(siteId: string, pageId: string): Page {
    return {
        id: pageId,
        name: `Page ${pageId}`,
        url: `https://example${siteId}.com/${pageId}`,
        autoApprove: true,
        siteId,
    };
}

export function createTestComment(pageId: string, commentId: string): Comment {
    return {
        id: commentId,
        author: null,
        text: "This is a test comment",
        date: Timestamp.now(),
        status: "Approved",
        pageId,
    };
}

export const NUMBER_OF_SAMPLES = 5;

/**
 * Creates test entities, write them into files.
 */
export function generateTestData() {
    const nonExistingUid = "u" + NUMBER_OF_SAMPLES;
    const nonExistingSiteId = "s" + NUMBER_OF_SAMPLES;
    const nonExistingPageId = "p" + NUMBER_OF_SAMPLES;
    const nonExistingCommentId = "c" + NUMBER_OF_SAMPLES;
    const nonExistingIds = {
        nonExistingUid,
        nonExistingSiteId,
        nonExistingPageId,
        nonExistingCommentId,
    };
    // Thank god `JSON stringify` has a pretty print option.
    writeFileSync(
        "./sample/server/nonExistingIds.json",
        `${JSON.stringify(nonExistingIds, null, 2)}\n`
    );

    const uids = Array.from({ length: NUMBER_OF_SAMPLES }, (_, i) => "u" + i);
    const siteIds = Array.from({ length: NUMBER_OF_SAMPLES }, (_, i) => "s" + i);
    const pageIds = Array.from({ length: NUMBER_OF_SAMPLES }, (_, i) => "p" + i);
    const commentIds = Array.from({ length: NUMBER_OF_SAMPLES }, (_, i) => "c" + i);

    const users = uids.map(createTestUser);
    const sites = siteIds.map((id, i) => createTestSite(uids[i], id));
    const pages = pageIds.map((id, i) => createTestPage(siteIds[i], id));
    const comments = commentIds.map((id, i) => createTestComment(pageIds[i], id));

    writeFileSync("./sample/server/users.json", `${JSON.stringify(users, null, 2)}\n`);
    writeFileSync("./sample/server/sites.json", `${JSON.stringify(sites, null, 2)}\n`);
    writeFileSync("./sample/server/pages.json", `${JSON.stringify(pages, null, 2)}\n`);
    writeFileSync("./sample/server/comments.json", `${JSON.stringify(comments, null, 2)}\n`);
}
