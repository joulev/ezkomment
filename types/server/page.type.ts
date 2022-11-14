import { Comment } from "./comment.type";

export type Page = {
    readonly id: string;

    title: string;
    url: string;
    autoApprove: boolean;

    totalCommentCount: number;
    pendingCommentCount: number;
    lastUpdated: number;

    readonly uid: string; // foreign key
    readonly siteId: string; // foreign key
};

export type UpdatePageBody = {
    url?: string;
    title?: string;
    autoApprove?: boolean;
};

export type CreatePageBody = {
    url: string;
    title: string;
    autoApprove: boolean; // default true
    siteId: string;
};

export type ClientPage = Page & { comments: Comment[] };

export type ExportPage = Page & { comments: Comment[] };
