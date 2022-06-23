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

export const USER = {
    displayNameIsValid: (name: string) => name.length > 0,
};

export const SITE = {
    nameIsValid: (name: string) => isSlug(name),
    domainIsValid: (domain: string) => domain === "*" || isFQDN(domain, { allow_wildcard: true }),
    // server-only
    uidIsValid: (uid: string) => uid.length > 0 && !uid.includes(" "),
    // obsolete?
    iconURLIsValid: (iconURL: string) => isURL(iconURL, { require_protocol: true }),
};

export const PAGE = {
    titleIsValid: (title: string) => title.length > 0,
    urlIsValid: (url: string) => isURL(url, { require_protocol: true }),
    // server-only
    siteIdIsValid: (siteId: string) => siteId.length > 0 && !siteId.includes(" "),
};

export const COMMENT = {
    textIsValid: (content: string) => content.length > 0,
    authorIsValid: (author: string) => author.length > 0,
    // server-only
    pageIdIsValid: (pageId: string) => pageId.length > 0 && !pageId.includes(" "),
};
