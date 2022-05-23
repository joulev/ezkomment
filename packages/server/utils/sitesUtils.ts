import { Request, Response } from "express";

import { firestoreAdmin } from "../lib/firebaseAdmin";

/**
 * Create a collection named `userSites`
 * Each document will contain the user uid and another subcollection `sites`
 * Pages' url will be listed in the `sites` subcollection.
 */

export async function getSites(req: Request, res: Response) {}

export async function createSite(req: Request, res: Response) {}

export async function deleteSites(req: Request, res: Response) {}
