import * as user from "~/server/crud/user";
import { UploadPhoto } from "~/server/crud/images";
import { ApiHandler, ApiRequestWithFormData, ApiResponse } from "~/server/next-connect";
import { ClientUser } from "~/types/server";

export const get: ApiHandler<ClientUser> = async (req, res) => {
    res.json(await user.get(req.uid!));
};

export const post: ApiHandler = async (req, res) => {
    await user.initialise(req.uid!);
    res.json({});
};

export const update: ApiHandler = async (req, res) => {
    await user.update(req.uid!, req.body);
    res.json({});
};

export async function uploadPhoto(req: ApiRequestWithFormData, res: ApiResponse) {
    const uid = req.uid!;
    const util = UploadPhoto.instance();
    const photoURL = util.getUrl(uid);
    await user.update(uid, { photoURL });
    await util.upload(uid, req.file);
    res.json({});
}

export const remove: ApiHandler = async (req, res) => {
    await user.remove(req.uid!);
    res.json({});
};
