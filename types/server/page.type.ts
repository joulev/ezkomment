export type Page = {
    id: string;
    name: string;
    url: string;
    autoApprove: boolean;

    siteId: string; // foreign key
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
    name: string;
    autoApprove?: boolean; // default true
    url: string;
};

export type CreatePageRequest = CreatePagePathParams & CreatePageBodyParams;
