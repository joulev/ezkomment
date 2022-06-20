import { UserImportRecord } from "firebase-admin/auth";
import { WriteBatch } from "firebase-admin/firestore";
import { Timestamp } from "firebase-admin/firestore";

import { authAdmin, firestoreAdmin } from "~/server/firebase/firebaseAdmin";
import {
    COMMENTS_COLLECTION,
    PAGES_COLLECTION,
    SITES_COLLECTION,
    USERS_COLLECTION,
} from "~/server/firebase/firestoreCollections";

import { Comment, Page, Site } from "~/types/server";

export { randomUUID } from "crypto";

function setSitesInBatch(batch: WriteBatch, sites: Site[]) {
    for (const site of sites) {
        const { id, uid, name } = site;
        batch.set(SITES_COLLECTION.doc(id), site);
        batch.set(USERS_COLLECTION.doc(uid).collection("sites").doc(name), { id });
    }
}

function setPagesInBatch(batch: WriteBatch, pages: Page[]) {
    for (const page of pages) {
        const { id, siteId, name } = page;
        batch.set(PAGES_COLLECTION.doc(id), page);
        batch.set(SITES_COLLECTION.doc(siteId).collection("pages").doc(name), { id });
    }
}

function setCommentsInBatch(batch: WriteBatch, comments: Comment[]) {
    for (const comment of comments) {
        const { id } = comment;
        batch.set(COMMENTS_COLLECTION.doc(id), comment);
    }
}

export async function importUsers(...users: UserImportRecord[]) {
    return await authAdmin.importUsers(users);
}

export async function importSites(...sites: Site[]) {
    const batch = firestoreAdmin.batch();
    setSitesInBatch(batch, sites);
    return await batch.commit();
}

export async function importPages(...pages: Page[]) {
    const batch = firestoreAdmin.batch();
    setPagesInBatch(batch, pages);
    return await batch.commit();
}

export async function importComments(...comments: Comment[]) {
    const batch = firestoreAdmin.batch();
    setCommentsInBatch(batch, comments);
    return await batch.commit();
}

type ImportData = {
    sites?: Site[];
    pages?: Page[];
    comments?: Comment[];
};

export async function importFirestoreEntities({
    sites = [],
    pages = [],
    comments = [],
}: ImportData) {
    if (sites.length + pages.length + comments.length === 0) return;
    const batch = firestoreAdmin.batch();
    setSitesInBatch(batch, sites);
    setPagesInBatch(batch, pages);
    setCommentsInBatch(batch, comments);
    return await batch.commit();
}

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
export function createTestSite(uid: string, id: string, name: string = `Site ${id}`): Site {
    return { id, name, domain: `example${id}.com`, iconURL: null, uid };
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

/**
 * Creates test entities, write them into files.
 */
export function generateTestData() {
    const NUMBER_OF_SAMPLES = 5;

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

    const { writeFileSync } = require("fs");

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
