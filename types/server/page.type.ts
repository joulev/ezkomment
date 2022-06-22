import { Comment } from "./comment.type";

export type Page = {
    readonly id: string;
    name: string;
    url: string;
    autoApprove: boolean;

    totalCommentCount: number;
    pendingCommentCount: number;

    readonly uid: string; // foreign key
    readonly siteId: string; // foreign key
};

export type UpdatePageBodyParams = {
    url?: string;
    name?: string;
    autoApprove?: boolean;
};

export type CreatePageBodyParams = {
    url: string;
    name: string;
    autoApprove: boolean; // default true
    siteId: string;
};

export type ClientPage = Page & { comments: Comment[] };
