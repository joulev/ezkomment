import { Timestamp } from "firebase-admin/firestore";

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
    totalCommentCount?: number;
    needApproval?: number;
    lastCommentDate?: Timestamp;

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
};

export type CreateSiteBodyParams = {
    name: string;
    domain: string;
    iconURL: string | null;
    uid: string;
};

export type SiteStatistics = {
    totalComment: number[];
    newComment: number[];
};

export type CreateSiteRequest = CreateSiteBodyParams & { pageCount: number };
