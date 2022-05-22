import { Request, Response } from "express";

import firestoreAdmin from "../lib/firestoreAdmin";

const USER_COLLECTION = firestoreAdmin.collection("users");

export async function getUser(req: Request, res: Response) {
    console.dir(req.body, { depth: null });
    try {
        const uid = req.body.uid;
        const result = await USER_COLLECTION.doc(uid).get();
        if (!result.exists) {
            res.status(404).json({ error: "Not found: No such user exist!" });
            return;
        }
        res.status(200).json({ data: result.data() });
    } catch (error) {
        console.error(error);
        res.status(400).json({
            error: "Bad request: cannot read the user info",
            message: `${error}`,
        });
    }
}

export async function createUser(req: Request, res: Response) {
    console.dir(req.body, { depth: null });
    try {
        const { uid, name, photo_url } = req.body;
        const result = await USER_COLLECTION.doc(uid).create({
            uid,
            name,
            photo_url,
        });
        res.status(201).json({ message: "New document was created!" });
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: "Bad request: cannot create new document" });
    }
}

export async function updateUser(req: Request, res: Response) {
    try {
        const { uid, name, photo_url } = req.body;
        // Update logic ?
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: "Bad request: cannot update document" });
    }
}

export async function deleteUser(req: Request, res: Response) {
    try {
        const uid = req.body.uid;
        const result = await USER_COLLECTION.doc(uid).delete();
        res.status(200).json({ message: "Document was deleted succesfully" });
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: "Bad request: cannot delete document" });
    }
}
