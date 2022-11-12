import * as notifications from "~/server/crud/notification";
import { ApiHandler, extractFirstQueryValue } from "~/server/next-connect";

export const deleteAll: ApiHandler = async (req, res) => {
    await notifications.deleteAll(req.uid!);
    res.json({});
};

export const deleteById: ApiHandler = async (req, res) => {
    const { id } = extractFirstQueryValue(req);
    await notifications.deleteById(req.uid!, id);
    res.json({});
};
