import * as NotificationUtils from "~/server/utils/crud/notificationUtils";
import { extractFirstQueryValue } from "~/server/utils/nextHandlerUtils";

import { Notification } from "~/types/server";
import { ApiRequest, ApiResponse } from "~/types/server/nextApi.type";

export async function listUserNotifications(req: ApiRequest, res: ApiResponse<Notification[]>) {
    const { uid } = extractFirstQueryValue(req);
    const data = await NotificationUtils.listUserNotifications(uid);
    res.status(200).json({ message: "Got user's notifications", data });
}

export async function deleteUserNotifications(req: ApiRequest, res: ApiResponse) {
    const { uid } = extractFirstQueryValue(req);
    await NotificationUtils.deleteUserNotifications(uid);
    res.status(200).json({ message: "Deleted user's notifications" });
}

export async function deleteNotification(req: ApiRequest, res: ApiResponse) {
    const { uid, notificationId } = extractFirstQueryValue(req);
    await NotificationUtils.deleteNotificationWithUid(uid, notificationId);
    res.status(200).json({ message: "Deleted notification" });
}
