export type Comment = {
    id: string;
    author: string | null; // If null, anonymous author
    text: string;
    status: ApprovedStatus;
};

export type ApprovedStatus = "Approved" | "Pending";

export type CreateCommentPathParams = {
    pageId: string;
};

/**
 * Only allow to update comment's status
 */
export type UpdateCommentBodyParams = {
    status?: ApprovedStatus;
};

/**
 * Currently, updating comments is not supported.
 */
export type CreateCommentBodyParams = Required<UpdateCommentBodyParams> & {
    author: string | null;
    text: string;
};

export type CreateCommentRequest = CreateCommentPathParams & CreateCommentBodyParams;
