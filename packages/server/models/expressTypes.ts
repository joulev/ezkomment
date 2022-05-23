import { Request, Response } from "express";
import { DecodedIdToken } from "firebase-admin/auth";

/**
 * Extends Request and Response interfaces of express to add custom properties.
 */

export interface IRequest extends Request {
    currentUser: DecodedIdToken | null;
}

export interface IResponse extends Response {}
