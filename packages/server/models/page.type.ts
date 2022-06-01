export type Page = {
    id: string;
    name: string;
    url: string;
    autoApprove: boolean;

    siteId: string; // foreign key
};

export type UpdatePageRequest = {
    name?: string;
    autoApprove?: boolean;
};

export type CreatePageRequest = UpdatePageRequest & {
    id?: string;
    url: string;
    siteId: string;
};
