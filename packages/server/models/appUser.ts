type AppUser = {
    uid: string;
    email: string | null;
    displayName: string | null;
    photoURL: string | null;
    /**
     * An user has multiple sites, and each site contains multiple pages
     * A sub collections `sites` may be used to represent this relation.
     */
};

export { AppUser };
