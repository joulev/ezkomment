/**
 * Basic definition and properties of a site.
 */
export type Site = {
    /**
     * The auto generated id of the site.
     */
    id: string;

    /**
     * The display name of the site.
     */
    name: string;

    /**
     * The domain of the site.
     */
    domain: string;

    /**
     * The URL to the site domain, if set
     */
    iconURL?: string;

    // Other properties to identify the site.
    /**
     *  The uid of the owner of this site.
     */
    uid: string;
};

/**
 * Basic properties required when update a site.
 */
export type UpdateSiteRequest = {
    name?: string;
    iconURL?: string;
};

export type CreateSiteRequest = UpdateSiteRequest & {
    id?: string;
    domain: string;
    uid: string;
};
