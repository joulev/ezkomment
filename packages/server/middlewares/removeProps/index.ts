/**
 * This module provides middlewares to remove ALL redudant properties of an object.
 */
import { KeyNameSet } from "@server/types";

export function _createRemovePropsMiddleware<T>(allowed: KeyNameSet<T>) {
    const allowedNames = allowed as Set<string>;
    return (obj: Record<string, any>) => {
        Object.keys(obj)
            .filter(name => allowedNames.has(name))
            .forEach(name => delete obj[name]);
    };
}

export * from "./sites";
