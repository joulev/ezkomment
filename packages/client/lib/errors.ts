const NOT_AUTHENTICATED = new Error(
    "No authenticated users found to link account. Please log in first."
) as NodeJS.ErrnoException;
NOT_AUTHENTICATED.code = "ezkomment/client";
export { NOT_AUTHENTICATED };