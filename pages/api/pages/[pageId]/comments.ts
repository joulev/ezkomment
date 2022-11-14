import { NextRequest } from "next/server";
import getAccessToken from "~/server/utils/google-auth";
import { Comment } from "~/types/server";

export const config = { runtime: "experimental-edge" };

type Document = {
    name: string;
    fields: Record<
        "id" | "siteId" | "pageId" | "text" | "author" | "status",
        { stringValue: string }
    > & { date: { integerValue: string } };
    createTime: string;
    updateTime: string;
};

async function getAllComments(token: string): Promise<Document[]> {
    let pageToken = "";
    let documents: Document[] = [];
    do {
        const url = `https://firestore.googleapis.com/v1/projects/ezkomment-dev/databases/(default)/documents/comments?pageSize=1000&pageToken=${pageToken}`;
        const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
        if (res.status !== 200) throw new Error("Failed to get comments");
        const data = await res.json();
        documents = documents.concat(data.documents);
        pageToken = data.nextPageToken;
    } while (pageToken);
    return documents;
}

async function getApprovedComments(pageId: string, token: string): Promise<Comment[]> {
    const documents = await getAllComments(token);
    const rawComments = documents
        .map(({ fields }) => fields)
        .filter(cmt => cmt.pageId.stringValue === pageId && cmt.status.stringValue === "Approved");
    const comments: Comment[] = rawComments.map(cmt => ({
        id: cmt.id.stringValue,
        author: cmt.author.stringValue,
        text: cmt.text.stringValue,
        date: parseInt(cmt.date.integerValue),
        status: cmt.status.stringValue as "Approved",
        siteId: cmt.siteId.stringValue,
        pageId: cmt.pageId.stringValue,
    }));
    return comments;
}

export default async function handler(req: NextRequest) {
    try {
        const token = await getAccessToken();
        const pageId = new URL(req.url).searchParams.get("pageId")!;
        const data = await getApprovedComments(pageId, token);
        return new Response(JSON.stringify(data), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (e) {
        return new Response("Something's wrong has happened", { status: 500 });
    }
}
