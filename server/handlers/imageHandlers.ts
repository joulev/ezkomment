import { uploadImage } from "~/server/utils/imageUtils";
import { extractFirstQueryValue, reportBadRequest } from "~/server/utils/nextHandlerUtils";

import { ApiRequestWithFormData, ApiResponse } from "~/types/server/nextApi.type";

export async function uploadUserPhoto(req: ApiRequestWithFormData, res: ApiResponse) {
    const { uid } = extractFirstQueryValue(req);
    try {
        const photoUrl: string = await uploadImage(`users/${uid}`, req.file);
        res.status(200).json({
            message: "Successfully uploaded user's photo",
            data: { photoUrl },
        });
    } catch (error) {
        reportBadRequest(res, error, "");
    }
}

export async function uploadSiteIcon(req: ApiRequestWithFormData, res: ApiResponse) {
    const { siteId } = extractFirstQueryValue(req);
    try {
        const iconUrl: string = await uploadImage(`sites/${siteId}`, req.file);
        res.status(200).json({
            message: "Successfully uploaded site's icon",
            data: { iconUrl },
        });
    } catch (error) {
        reportBadRequest(res, error, "");
    }
}
