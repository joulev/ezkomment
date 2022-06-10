/**
 * This module provides middlewares to remove ALL redudant properties of an object.
 */
import { KeyNameSet } from "~/server/types";
import { INextApiMiddleware } from "~/server/types/nextApi.type";

export function _createRemovePropsMiddleware<T>(allowed: KeyNameSet<T>) {
    const allowedNames = allowed as Set<string>;
    const middleware: INextApiMiddleware = (req, _, next) => {
        const obj = req.body;
        Object.keys(obj)
            .filter(name => !allowedNames.has(name))
            .forEach(name => delete obj[name]);
        return next();
    };
    return middleware;
}

export * from "./sites";
