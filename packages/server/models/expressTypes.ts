import { Request, Response } from "express";
import { DecodedIdToken } from "firebase-admin/auth";

/**
 * Extends Request and Response interfaces of express to add custom properties.
 * Can also use Declaration Merging to achieve the same result?
 */

export interface IRequest extends Request {
    currentUser?: DecodedIdToken;
}

export interface IResponse extends Response {}
