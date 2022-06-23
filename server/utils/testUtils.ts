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

import { Comment, OnlyRequired, Page, Site } from "~/types/server";

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
        const { id } = page;
        batch.set(PAGES_COLLECTION.doc(id), page);
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
 * Oh my god, look at this unholy... I wish TypeScript has something like Haskell `@`
 * user@(User uid id name ...)
 */
export function createTestSite({
    id,
    uid,
    name = `Site ${id}`,
    domain = `https://example${id}.com`,
    iconURL = null,
    pageCount = 0,
    totalCommentCount = 0,
    pendingCommentCount = 0,
}: OnlyRequired<Site, "uid" | "id">): Site {
    return { uid, id, name, domain, pageCount, iconURL, totalCommentCount, pendingCommentCount };
}

export function createTestPage({
    id,
    uid,
    siteId,
    title = `Page ${id}`,
    autoApprove = true,
    url = `https://example${siteId}.com/${id}`,
    totalCommentCount = 0,
    pendingCommentCount = 0,
}: OnlyRequired<Page, "id" | "siteId" | "uid">): Page {
    return { id, title, url, autoApprove, totalCommentCount, pendingCommentCount, uid, siteId };
}

export function createTestComment({
    id,
    pageId,
    siteId,
    author = null,
    text = "Naname nanajyuunana-do no narabi de nakunaku inanaku nanahan nanadai nannaku narabete naganagame",
    date = Timestamp.now(),
    status = "Approved",
}: OnlyRequired<Comment, "id" | "pageId" | "siteId">): Comment {
    return { id, author, text, date, status, siteId, pageId };
}

/**
 * Creates test entities, write them into files.
 * istanbul ignore next
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

    // const uids = Array.from({ length: NUMBER_OF_SAMPLES }, (_, i) => "u" + i);
    // const siteIds = Array.from({ length: NUMBER_OF_SAMPLES }, (_, i) => "s" + i);
    // const pageIds = Array.from({ length: NUMBER_OF_SAMPLES }, (_, i) => "p" + i);
    // const commentIds = Array.from({ length: NUMBER_OF_SAMPLES }, (_, i) => "c" + i);

    // const users = uids.map(createTestUser);
    // const sites = siteIds.map((id, i) => createTestSite(uids[i], id));
    // const pages = pageIds.map((id, i) => createTestPage(siteIds[i], id));
    // const comments = commentIds.map((id, i) => createTestComment(pageIds[i], id));

    // writeFileSync("./sample/server/users.json", `${JSON.stringify(users, null, 2)}\n`);
    // writeFileSync("./sample/server/sites.json", `${JSON.stringify(sites, null, 2)}\n`);
    // writeFileSync("./sample/server/pages.json", `${JSON.stringify(pages, null, 2)}\n`);
    // writeFileSync("./sample/server/comments.json", `${JSON.stringify(comments, null, 2)}\n`);
}
