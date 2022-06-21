import { Comment } from "./comment.type";

export type Page = {
    readonly id: string;
    name: string;
    url: string;
    autoApprove: boolean;

    totalCommentCount: number;
    pendingCommentCount: number;
    readonly siteId: string; // foreign key
};

export type CreatePagePathParams = {
    /**
     * The id of the site that contains this page.
     */
    siteId: string;
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

export type CreatePageRequest = CreatePageBodyParams & {
    totalCommentCount: number;
    pendingCommentCount: number;
};

export type ClientPage = Page & { comments: Comment[] };
