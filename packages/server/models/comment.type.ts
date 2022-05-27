export type Comment = {
    id: string;
    author?: string;
    createdAt: any; // will be changed later to <Firebase time stamp>
    text: string;
    status: ApprovedStatus;
    pageId: string;
};

export type ApprovedStatus = "Approved" | "Pending";

export type CommentUpdate = {
    status: ApprovedStatus;
};
