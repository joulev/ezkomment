const UNKNOWN_ERROR = new Error(
    "Unknown error. Please contact the administrator."
) as NodeJS.ErrnoException;
export { UNKNOWN_ERROR };

const DID_YOU_JUST_HACK_THE_SYSTEM = new Error(
    "We got an error we expect to never happen. Did you just hack us? Please report this bug to us."
) as NodeJS.ErrnoException;
export { DID_YOU_JUST_HACK_THE_SYSTEM };

const NOT_AUTHENTICATED = new Error(
    "No authenticated users found to link account. Please log in first."
) as NodeJS.ErrnoException;
NOT_AUTHENTICATED.code = "ezkomment/client";
export { NOT_AUTHENTICATED };

const UNABLE_TO_UPDATE_NAME = new Error(
    "Unable to update display name. Please try again later."
) as NodeJS.ErrnoException;
UNABLE_TO_UPDATE_NAME.code = "ezkomment/client";
export { UNABLE_TO_UPDATE_NAME };

const UNABLE_TO_UPDATE_PHOTO = new Error(
    "Unable to update photo. Please try again later."
) as NodeJS.ErrnoException;
UNABLE_TO_UPDATE_PHOTO.code = "ezkomment/client";
export { UNABLE_TO_UPDATE_PHOTO };

const UNABLE_TO_DELETE_ACCOUNT = new Error(
    "Unable to delete account. Please try again later."
) as NodeJS.ErrnoException;
UNABLE_TO_DELETE_ACCOUNT.code = "ezkomment/client";
export { UNABLE_TO_DELETE_ACCOUNT };

const UNABLE_TO_CREATE_SITE = new Error(
    "Unable to create site. Please try again later."
) as NodeJS.ErrnoException;
UNABLE_TO_CREATE_SITE.code = "ezkomment/client";
export { UNABLE_TO_CREATE_SITE };

const UNABLE_TO_UPDATE_SITE = new Error(
    "Unable to update site. Please try again later."
) as NodeJS.ErrnoException;
UNABLE_TO_UPDATE_SITE.code = "ezkomment/client";
export { UNABLE_TO_UPDATE_SITE };

const UNABLE_TO_DELETE_SITE = new Error(
    "Unable to delete site. Please try again later."
) as NodeJS.ErrnoException;
UNABLE_TO_DELETE_SITE.code = "ezkomment/client";
export { UNABLE_TO_DELETE_SITE };

const SITE_ALREADY_EXISTS = new Error(
    "Site already exists. Please try again with a different name."
) as NodeJS.ErrnoException;
SITE_ALREADY_EXISTS.code = "ezkomment/client";
export { SITE_ALREADY_EXISTS };

const PAGE_WRONG_SITE_DOMAIN = new Error(
    "Page URL domain and site domain do not match. Consider adding a new site or changing the site domain to wildcard (*) if you want to support several domains."
) as NodeJS.ErrnoException;
PAGE_WRONG_SITE_DOMAIN.code = "ezkomment/client";
export { PAGE_WRONG_SITE_DOMAIN };

const UNABLE_TO_CREATE_PAGE = new Error(
    "Unable to create page. Please try again later."
) as NodeJS.ErrnoException;
UNABLE_TO_CREATE_PAGE.code = "ezkomment/client";
export { UNABLE_TO_CREATE_PAGE };

const UNABLE_TO_UPDATE_PAGE = new Error(
    "Unable to update page. Please try again later."
) as NodeJS.ErrnoException;
UNABLE_TO_UPDATE_PAGE.code = "ezkomment/client";
export { UNABLE_TO_UPDATE_PAGE };

const UNABLE_TO_DELETE_PAGE = new Error(
    "Unable to delete page. Please try again later."
) as NodeJS.ErrnoException;
UNABLE_TO_DELETE_PAGE.code = "ezkomment/client";
export { UNABLE_TO_DELETE_PAGE };

const UNABLE_TO_APPROVE_COMMENT = new Error(
    "Unable to approve comment. Please try again later."
) as NodeJS.ErrnoException;
UNABLE_TO_APPROVE_COMMENT.code = "ezkomment/client";
export { UNABLE_TO_APPROVE_COMMENT };

const UNABLE_TO_DELETE_COMMENT = new Error(
    "Unable to delete comment. Please try again later."
) as NodeJS.ErrnoException;
UNABLE_TO_DELETE_COMMENT.code = "ezkomment/client";
export { UNABLE_TO_DELETE_COMMENT };
