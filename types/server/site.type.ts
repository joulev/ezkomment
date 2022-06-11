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
    iconURL: string | null;

    // Other properties to identify the site.
    /**
     *  The uid of the owner of this site.
     */
    uid: string;
};

export type CreateSitePathParams = {
    uid: string;
};

/**
 * Basic properties required when update a site.
 */
export type UpdateSiteBodyParams = {
    name?: string;
    iconURL?: string | null;
};

export type CreateSiteBodyParams = Required<UpdateSiteBodyParams> & {
    domain: string;
};

export type CreateSiteRequest = CreateSitePathParams & CreateSiteBodyParams;
