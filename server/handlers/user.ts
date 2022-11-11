import { setCookie } from "nookies";
import { getUserById, listUserSites } from "~/server/crud/user";
import { ApiHandler } from "~/server/next-connect";
import { ClientUser } from "~/types/server";

export const getUser: ApiHandler<ClientUser | undefined> = async (req, res) => {
    try {
        const { uid } = req;
        if (!uid) throw new Error("Something's wrong");
        const user = await getUserById(uid);
        const sites = await listUserSites(uid);
        res.status(200).json({ ...user, sites });
    } catch (err) {
        setCookie({ res }, "session", "", { maxAge: 0, path: "/" });
        res.status(200).json(undefined);
    }
};
