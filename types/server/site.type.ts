import { Page } from "./page.type";

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

export type SiteCustomisation = {
    customisation: string;
};

export type UpdateSiteCustomisationBodyParams = {
    customisation: string;
};

export type ClientSite = Site & {
    pages: Page[];
};
