const INVALID_EMAIL_LINK = new Error("The email link is invalid.") as NodeJS.ErrnoException;
INVALID_EMAIL_LINK.code = "ezkomment/client";
export { INVALID_EMAIL_LINK };
