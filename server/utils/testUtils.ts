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
    date = Timestamp.now().toMillis(),
    status = "Approved",
}: OnlyRequired<Comment, "id" | "pageId" | "siteId">): Comment {
    return { id, author, text, date, status, siteId, pageId };
}
