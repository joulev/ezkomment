/**
 * @file validate.ts
 *
 * Since we do a lot of validating on both frontend and backend, it is wise to use the same
 * validation logic on both ends. So that we can make change easily whenever we need to.
 */
// Import this way for the sake of tree-shaking
import isFQDN from "validator/lib/isFQDN";
import isSlug from "validator/lib/isSlug";
import isURL from "validator/lib/isURL";

const idIsValid = (id: string) => {
    // Based on Firebase documentation
    return (
        id.length > 0 &&
        id !== "." &&
        id !== ".." &&
        !id.includes(" ") &&
        !id.includes("/") &&
        !/__.*__/.test(id)
    );
};

export const USER = {
    displayNameIsValid: (displayName: string) => displayName.length > 0,
};

export const SITE = {
    nameIsValid: (name: string) => isSlug(name),
    domainIsValid: (domain: string) => domain === "*" || isFQDN(domain),
    // obsolete?
    iconURLIsValid: (iconURL: string) => isURL(iconURL, { require_protocol: true }),
    // server-only
    /**
     * Deprecated as now the uid is obtained from decoded id token.
     * Will just leave it here at the moment, may be this is useful in some cases?
     */
    uidIsValid: idIsValid,
};

export const PAGE = {
    titleIsValid: (title: string) => title.length > 0,
    urlIsValid: (url: string) => isURL(url, { require_protocol: true }),
    // server-only
    siteIdIsValid: idIsValid,
};

export const COMMENT = {
    textIsValid: (content: string) => content.length > 0,
    authorIsValid: (author: string) => author.length > 0,
    // server-only
    pageIdIsValid: idIsValid,
};
