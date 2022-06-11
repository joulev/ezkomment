/**
 * This module provides middlewares to remove ALL redudant properties of an object.
 */
import { KeyNameSet } from "~/types/server";
import { ApiMiddleware } from "~/types/server/nextApi.type";

export function _createRemovePropsMiddleware<T>(allowed: KeyNameSet<T>) {
    const allowedNames = allowed as Set<string>;
    const middleware: ApiMiddleware = (req, _, next) => {
        const obj = req.body;
        Object.keys(obj)
            .filter(name => !allowedNames.has(name))
            .forEach(name => delete obj[name]);
        return next();
    };
    return middleware;
}

export * from "./sites";
