import { UploadSiteIconUtil, UploadUserPhotoUtil } from "~/server/utils/crud/imageUtils";
import { updateSiteWithUid } from "~/server/utils/crud/siteUtils";
import { updateUserById } from "~/server/utils/crud/userUtils";
import { extractFirstQueryValue } from "~/server/utils/nextHandlerUtils";

import {
    ApiRequestWithFormData,
    ApiResponse,
    AuthenticatedApiRequestWithFormData,
} from "~/types/server/nextApi.type";

export async function uploadUserPhoto(req: ApiRequestWithFormData, res: ApiResponse) {
    const { uid } = extractFirstQueryValue(req);
    const util = UploadUserPhotoUtil.instance();
    const photoURL = util.getUserPhotoUrl(uid);
    await updateUserById(uid, { photoURL });
    await util.uploadUserPhoto(uid, req.file);
    res.status(201).json({ message: "Uploaded user's photo", data: { photoURL } });
}

export async function uploadSiteIcon(req: AuthenticatedApiRequestWithFormData, res: ApiResponse) {
    const { uid } = req.user;
    const { siteId } = extractFirstQueryValue(req);
    const util = UploadSiteIconUtil.instance();
    const iconURL = util.getSiteIconUrl(siteId);
    await updateSiteWithUid(uid, siteId, { iconURL });
    await util.uploadSiteIcon(siteId, req.file);
    res.status(201).json({ message: "Uploaded site's icon", data: { iconURL } });
}
