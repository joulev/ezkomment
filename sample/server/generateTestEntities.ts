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

const NUMBER_OF_SAMPLES = 5;

export const UIDS = Array.from({ length: NUMBER_OF_SAMPLES }, (_, i) => "u" + i);
export const SITE_IDS = Array.from({ length: NUMBER_OF_SAMPLES }, (_, i) => "s" + i);
export const PAGE_IDS = Array.from({ length: NUMBER_OF_SAMPLES }, (_, i) => "p" + i);
export const COMMENT_IDS = Array.from({ length: NUMBER_OF_SAMPLES }, (_, i) => "c" + i);

/**
 * Creates test entities, write them into files.
 */
export function generateTestData() {
    const users = UIDS.map(createTestUser);
    const sites = SITE_IDS.map((id, i) => createTestSite(UIDS[i], id));
    const pages = PAGE_IDS.map((id, i) => createTestSite(SITE_IDS[i], id));
    const comments = COMMENT_IDS.map((id, i) => createTestSite(PAGE_IDS[i], id));
    writeFileSync("./sample/server/users.json", JSON.stringify(users));
    writeFileSync("./sample/server/sites.json", JSON.stringify(sites));
    writeFileSync("./sample/server/pages.json", JSON.stringify(pages));
    writeFileSync("./sample/server/comments.json", JSON.stringify(comments));
}
