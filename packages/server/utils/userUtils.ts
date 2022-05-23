import { Request, Response } from "express";

import firestoreAdmin from "../lib/firestoreAdmin";

const USER_COLLECTION = firestoreAdmin.collection("users");

function reportBadRequest(err: unknown, msg: string) {
    return {
        error: `${err}`,
        message: msg,
    };
}

export async function getUser(req: Request, res: Response) {
    console.dir(req.body, { depth: null });
    try {
        const uid = req.body.uid;
        const result = await USER_COLLECTION.doc(uid).get();
        if (!result.exists) {
            res.status(404).json({ error: "Not found: No such user exist!" });
            return;
        }
        res.status(200).json({
            message: "Successfully read user's data",
            data: result.data(),
        });
    } catch (error) {
        console.error(error);
        res.status(400).json(reportBadRequest(error, "Bad request: cannot get document"));
    }
}

export async function createUser(req: Request, res: Response) {
    console.dir(req.body, { depth: null });
    try {
        const { uid, name, photo_url } = req.body.uid;
        await USER_COLLECTION.doc(uid).create({
            uid,
            name,
            photo_url,
        });
        res.status(201).json({ message: "New document was created!" });
    } catch (error) {
        console.error(error);
        res.status(400).json(reportBadRequest(error, "Bad request: cannot create new document"));
    }
}

export async function updateUser(req: Request, res: Response) {
    try {
        const { uid, name, photo_url } = req.body;
        const data: { [k: string]: any } = {};
        if (name) {
            data.name = name;
        }
        if (photo_url) {
            data.photo_url = photo_url;
        }
        await USER_COLLECTION.doc(uid).update(data);
        res.status(200).json({ message: "Document was updated successfully" });
    } catch (error) {
        console.error(error);
        res.status(400).json(reportBadRequest(error, "Bad request: cannot update document"));
    }
}

export async function deleteUser(req: Request, res: Response) {
    try {
        const uid = req.body.uid;
        await USER_COLLECTION.doc(uid).delete();
        res.status(200).json({ message: "Document was deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(400).json(reportBadRequest(error, "Bad request: cannot delete document"));
    }
}
