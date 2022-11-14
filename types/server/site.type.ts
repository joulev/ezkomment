import { ExportPage, Page } from "./page.type";

export type Site = {
    /**
     * The auto generated id of the site.
     */
    readonly id: string;

    /**
     * The display name of the site.
     */
    name: string;

    /**
     * The URL to the site domain, if set
     */
    iconURL: string | null;

    /**
     * The domain of the site.
     */
    domain: string;

    pageCount: number;
    totalCommentCount: number;
    pendingCommentCount: number;
    lastUpdated: number;

    // Foreign key

    /**
     *  The uid of the owner of this site.
     */
    readonly uid: string;
};

/**
 * Basic properties required when update a site.
 */
export type UpdateSiteBody = {
    name?: string;
    iconURL?: string | null;
    domain?: string;
};

export type CreateSiteBody = {
    name: string;
    domain: string;
    iconURL: string | null;
};

export type SiteStatistics = {
    /**
     * `totalComment[i]` is the total number of comments until `i` days ago
     */
    totalComment: number[];
    /**
     * `newComment[i]` is the number of new comments `i` days ago
     */
    newComment: number[];
};

export type SiteTemplate = {
    template: string;
};

export type UpdateSiteTemplateBody = {
    template: string;
};

export type ClientSite = Site & {
    pages: Page[];
};

export type ExportSite = Site & { pages: ExportPage[] } & Partial<SiteTemplate>;
