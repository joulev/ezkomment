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

export type UpdatePageBodyParams = {
    url?: string;
    title?: string;
    autoApprove?: boolean;
};

export type CreatePageBodyParams = {
    url: string;
    title: string;
    autoApprove: boolean; // default true
    siteId: string;
};

export type ClientPage = Page & { comments: Comment[] };
