const NOT_AUTHENTICATED = new Error(
    "No authenticated users found to link account. Please log in first."
) as NodeJS.ErrnoException;
NOT_AUTHENTICATED.code = "ezkomment/client";

const UNABLE_TO_UPDATE_NAME = new Error(
    "Unable to update display name. Please try again later."
) as NodeJS.ErrnoException;
UNABLE_TO_UPDATE_NAME.code = "ezkomment/client";

const UNABLE_TO_DELETE_ACCOUNT = new Error(
    "Unable to delete account. Please try again later."
) as NodeJS.ErrnoException;
UNABLE_TO_DELETE_ACCOUNT.code = "ezkomment/client";

export { NOT_AUTHENTICATED, UNABLE_TO_UPDATE_NAME, UNABLE_TO_DELETE_ACCOUNT };
