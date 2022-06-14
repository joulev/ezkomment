import * as SiteUtils from "~/server/utils/siteUtils";
import * as UserUtils from "~/server/utils/userUtils";
import { getImagePublicUrl, uploadImage } from "~/server/utils/imageUtils";
import { extractFirstQueryValue, reportBadRequest } from "~/server/utils/nextHandlerUtils";

import { ApiRequestWithFormData, ApiResponse } from "~/types/server/nextApi.type";

export async function uploadUserPhoto(req: ApiRequestWithFormData, res: ApiResponse) {
    const { uid } = extractFirstQueryValue(req);
    const imgName = `users/${uid}`;
    try {
        const photoURL = getImagePublicUrl(imgName);
        await UserUtils.updateUserById(uid, { photoURL });
        await uploadImage(imgName, req.file);
        res.status(200).json({
            message: "Successfully uploaded user's photo",
            data: { photoURL },
        });
    } catch (error) {
        reportBadRequest(res, error, "");
    }
}

export async function uploadSiteIcon(req: ApiRequestWithFormData, res: ApiResponse) {
    const { siteId } = extractFirstQueryValue(req);
    const imgName = `sites/${siteId}`;
    try {
        const iconURL = getImagePublicUrl(imgName);
        await SiteUtils.updateSiteById(siteId, { iconURL });
        await uploadImage(imgName, req.file);
        res.status(200).json({
            message: "Successfully uploaded site's icon",
            data: { iconURL },
        });
    } catch (error) {
        reportBadRequest(res, error, "");
    }
}
