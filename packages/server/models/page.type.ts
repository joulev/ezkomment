export type Page = {
    id: string;
    name: string;
    url: string;
    autoApprove: boolean;

    siteId: string; // foreign key
};

export type PageUpdate = {
    name?: string;
    autoApprove?: boolean;
};
