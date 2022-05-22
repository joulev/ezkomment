type AppUser = {
    uid: string;
    name: string | null;
    photo_url: string | null;
    /**
     * An user has multiple sites, and each site contains multiple pages
     * A sub collections `sites` may be used to represent this relation.
     */
};

type AppSite = {
    pages: string[];
};

export { AppUser, AppSite };
