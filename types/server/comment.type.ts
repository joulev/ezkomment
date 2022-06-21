import { Timestamp } from "firebase-admin/firestore";

export type Comment = {
    readonly id: string;
    /**
     * If null, anonymous author.
     */
    readonly author: string | null;
    text: string;
    date: Timestamp;
    status: ApprovedStatus;

    readonly siteId: string;
    readonly pageId: string;
};

export type ApprovedStatus = "Approved" | "Pending";

export type CreateCommentPathParams = {
    pageId: string;
};

/**
 * Only allow to update comment's status
 */
export type UpdateCommentBodyParams = {
    status: ApprovedStatus;
};

/**
 * Currently, updating comments' text or author is not supported.
 * We will get the comment status by querying the page containing the comment
 */
export type CreateCommentBodyParams = {
    author: string | null;
    text: string;
};

export type CreateCommentRequest = CreateCommentPathParams & CreateCommentBodyParams;
