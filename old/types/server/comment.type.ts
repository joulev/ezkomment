export type Comment = {
    readonly id: string;
    /**
     * If null, anonymous author.
     */
    readonly author: string | null;
    text: string;
    /**
     * We will need to sort comments.
     * Storing the data as Timestamp is not good, as when we read the document we get
     * { _seconds: number, _nanoseconds: number }
     */
    date: number;
    status: ApprovedStatus;

    readonly siteId: string;
    readonly pageId: string;
};

export type ApprovedStatus = "Approved" | "Pending";

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
    pageId: string;
    author: string | null;
    text: string;
};
