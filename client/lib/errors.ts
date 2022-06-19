const UNKNOWN_ERROR = new Error(
    "Unknown error. Please contact the administrator."
) as NodeJS.ErrnoException;
export { UNKNOWN_ERROR };

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

const SITE_ALREADY_EXISTS = new Error(
    "Site already exists. Please try again with a different name."
) as NodeJS.ErrnoException;
SITE_ALREADY_EXISTS.code = "ezkomment/client";
export { SITE_ALREADY_EXISTS };
