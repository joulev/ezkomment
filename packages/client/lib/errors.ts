const INVALID_EMAIL_LINK = new Error("The email link is invalid.") as NodeJS.ErrnoException;
INVALID_EMAIL_LINK.code = "ezkomment/client";
export { INVALID_EMAIL_LINK };

const NOT_AUTHENTICATED = new Error(
    "No authenticated users found to link account. Please log in first."
) as NodeJS.ErrnoException;
NOT_AUTHENTICATED.code = "ezkomment/client";
export { NOT_AUTHENTICATED };
