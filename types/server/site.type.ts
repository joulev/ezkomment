import { Page } from "./page.type";

export type Site = {
    // properties that can be updated safely.

    /**
     * The display name of the site.
     */
    name: string;

    /**
     * The URL to the site domain, if set
     */
    iconURL: string | null;

    // Readonly properties.

    /**
     * The auto generated id of the site.
     */
    readonly id: string;

    /**
     * The domain of the site.
     *
     */
    domain: string;

    // Statistic, optional at the moment

    /**
     * The number of page in this site
     */
    pageCount: number;
    totalCommentCount: number;
    pendingCommentCount: number;

    // Foreign key

    /**
     *  The uid of the owner of this site.
     */
    uid: string;
};

/**
 * Basic properties required when update a site.
 */
export type UpdateSiteBodyParams = {
    name?: string;
    iconURL?: string | null;
    domain?: string;
};

export type CreateSiteBodyParams = {
    name: string;
    domain: string;
    iconURL: string | null;
};

export type SiteStatistics = {
    totalComment: number[];
    newComment: number[];
};

export type ClientSite = Site & {
    pages: Page[];
    statistic: SiteStatistics;
};
