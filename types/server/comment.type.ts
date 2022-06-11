import { Timestamp } from "firebase-admin/firestore";

export type Comment = {
    id: string;
    author: string | null; // If null, anonymous author
    text: string;
    status: ApprovedStatus;
    createTime: Timestamp;
};

export type ApprovedStatus = "Approved" | "Pending";

/**
 * Only allow to update comment's status
 */
export type UpdateCommentRequest = {
    status?: ApprovedStatus;
};

/**
 * Currently, updating comments is not supported.
 */
export type CreateCommentRequest = Required<UpdateCommentRequest> & {
    author: string | null;
    text: string;
};
