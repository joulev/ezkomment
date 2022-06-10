export type Comment = {
    id: string;
    author: string;
    date: any; // will be changed later to <Firebase time stamp>
    text: string;
    status: ApprovedStatus;
};

export type ApprovedStatus = "Approved" | "Pending";

export type CommentUpdate = {
    status: ApprovedStatus;
};

/**
 * Only allow to update comment's status
 */
export type UpdateCommentRequest = {
    status?: ApprovedStatus;
};

/**
 * Currently, updating comments is not supported.
 */
export type CreateCommentRequest = UpdateCommentRequest & {
    author?: string;
    text: string;
};
