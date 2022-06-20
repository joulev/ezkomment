/**
 * @file validate.ts
 *
 * Since we do a lot of validating on both frontend and backend, it is wise to use the same
 * validation logic on both ends. So that we can make change easily whenever we need to.
 */
// Import this way for the sake of tree-shaking
import isSlug from "validator/lib/isSlug";
import isURL from "validator/lib/isURL";

export const SITE = {
    nameIsValid: (name: string) => isSlug(name),
    domainIsValid: (domain: string) =>
        isURL(domain, { require_protocol: true, protocols: ["http", "https"] }),
};
