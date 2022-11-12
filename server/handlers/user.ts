import * as user from "~/server/crud/user";
import { ApiHandler } from "~/server/next-connect";
import { ClientUser } from "~/types/server";

export const get: ApiHandler<ClientUser> = async (req, res) => {
    res.json(await user.get(req.uid!));
};
