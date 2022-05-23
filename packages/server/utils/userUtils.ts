import { authAdmin } from "../lib/firebaseAdmin";
import { IRequest, IResponse } from "../models/expressTypes";

function reportBadRequest(err: unknown, msg: string) {
    console.error(err);
    return {
        error: `${err}`,
        message: msg,
    };
}

export const getUser = async (req: IRequest, res: IResponse) => {
    console.dir(req.body, { depth: null });
    // Can only get data of the user when the user is logged in
    try {
        const result = await authAdmin.getUser(req.body.uid);
        res.status(200).json({
            message: "Successfully get user's data",
            data: result.toJSON,
        });
    } catch (error) {
        res.status(400).json(reportBadRequest(error, "Bad request: cannot get user"));
    }
};

export async function updateUser(req: IRequest, res: IResponse) {
    try {
        const { uid, displayName, photoURL } = req.body;
        const data: { [k: string]: any } = {};
        if (displayName) {
            data.displayName = displayName;
        }
        if (photoURL) {
            data.photoURL = photoURL;
        }
        await authAdmin.updateUser(uid, data);
        res.status(200).json({ message: "User was updated successfully" });
    } catch (error) {
        res.status(400).json(reportBadRequest(error, "Bad request: cannot update user"));
    }
}

export async function deleteUser(req: IRequest, res: IResponse) {
    try {
        const uid = req.body.uid;
        await authAdmin.deleteUser(uid);
        res.status(200).json({ message: "Document was deleted successfully" });
    } catch (error) {
        res.status(400).json(reportBadRequest(error, "Bad request: cannot delete document"));
    }
}

// For development and testing
export async function createUser(req: IRequest, res: IResponse) {
    console.dir(req.body, { depth: null });
    try {
        const { uid, displayName, photoURL } = req.body.uid;
        await authAdmin.createUser({
            uid,
            displayName,
            photoURL,
        });
        res.status(201).json({ message: "New user was created!" });
    } catch (error) {
        res.status(400).json(reportBadRequest(error, "Bad request: cannot create new user"));
    }
}

export async function importUsers(req: IRequest, res: IResponse) {
    try {
        // need to store all users info in an array, which is not the best design
        const userInfo = req.body.users;
        await authAdmin.importUsers(userInfo);
        res.status(201).json({ message: "Imported new users" });
    } catch (error) {
        res.status(400).json(reportBadRequest(error, "Bad request: cannot import users"));
    }
}
