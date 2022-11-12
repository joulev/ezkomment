import * as notifications from "~/server/crud/notification";
import { ApiHandler, extractFirstQueryValue } from "~/server/next-connect";
import { Notification } from "~/types/server";

export const get: ApiHandler<Notification[]> = async (req, res) => {
    res.json(await notifications.get(req.uid!));
};

export const deleteAll: ApiHandler = async (req, res) => {
    await notifications.deleteAll(req.uid!);
    res.json({});
};

export const deleteById: ApiHandler = async (req, res) => {
    const { id } = extractFirstQueryValue(req);
    await notifications.deleteById(req.uid!, id);
    res.json({});
};
