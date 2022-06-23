import { getImagePublicUrl, uploadImage } from "~/server/utils/crud/imageUtils";
import { updateSiteById } from "~/server/utils/crud/siteUtils";
import { updateUserById } from "~/server/utils/crud/userUtils";
import { extractFirstQueryValue } from "~/server/utils/nextHandlerUtils";

import {
    ApiRequestWithFormData,
    ApiResponse,
    AuthenticatedApiRequestWithFormData,
} from "~/types/server/nextApi.type";

export async function uploadUserPhoto(req: ApiRequestWithFormData, res: ApiResponse) {
    const { uid } = extractFirstQueryValue(req);
    const imgName = `users/${uid}`;
    const photoURL = getImagePublicUrl(imgName);
    await updateUserById(uid, { photoURL });
    await uploadImage(imgName, req.file);
    res.status(201).json({
        message: "Uploaded user's photo",
        data: { photoURL },
    });
}

export async function uploadSiteIcon(req: AuthenticatedApiRequestWithFormData, res: ApiResponse) {
    const { uid } = req.user;
    const { siteId } = extractFirstQueryValue(req);
    const imgName = `sites/${siteId}`;
    const iconURL = getImagePublicUrl(imgName);
    await updateSiteById(uid, siteId, { iconURL });
    await uploadImage(imgName, req.file);
    res.status(201).json({
        message: "Uploaded site's icon",
        data: { iconURL },
    });
}
