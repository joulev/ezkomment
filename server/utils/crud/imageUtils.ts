import { randomUUID } from "crypto";

import { bucketAdmin } from "~/server/firebase/firebaseAdmin";
import CustomApiError from "~/server/utils/errors/customApiError";

import { FormDataFile } from "~/types/server/nextApi.type";

abstract class UploadImageUtil {
    private readonly uuid: string;
    private static readonly bucket: string = process.env.FIREBASE_STORAGE_BUCKET as string;

    protected constructor() {
        this.uuid = randomUUID();
    }

    protected getImageUrl(imgName: string) {
        const url = `https://firebasestorage.googleapis.com/v0/b/${
            UploadImageUtil.bucket
        }/o/${encodeURIComponent(imgName)}?alt=media&token=${this.uuid}`;
        if (process.env.NODE_ENV === "development") console.log("url: " + url);
        return url;
    }

    protected async uploadImage(imgName: string, file?: FormDataFile) {
        if (!file) {
            throw new CustomApiError("No file to upload", 400);
        }
        const { mimetype, buffer } = file;
        const blob = bucketAdmin.file(imgName);
        await blob.save(buffer, { contentType: mimetype });
        await blob.setMetadata({
            metadata: {
                firebaseStorageDownloadTokens: this.uuid,
            },
        });
        if (process.env.NODE_ENV === "development") {
            console.log("uploaded image!");
            console.log("minetype: " + mimetype);
        }
    }
}

export class UploadUserPhotoUtil extends UploadImageUtil {
    constructor() {
        super();
    }

    static instance() {
        return new UploadUserPhotoUtil();
    }

    getUserPhotoUrl(uid: string) {
        return this.getImageUrl(`users/${uid}`);
    }

    async uploadUserPhoto(uid: string, file?: FormDataFile) {
        return await this.uploadImage(`users/${uid}`, file);
    }
}

export class UploadSiteIconUtil extends UploadImageUtil {
    constructor() {
        super();
    }

    static instance() {
        return new UploadSiteIconUtil();
    }

    getSiteIconUrl(siteId: string) {
        return this.getImageUrl(`sites/${siteId}`);
    }

    async uploadSiteIcon(siteId: string, file?: FormDataFile) {
        return await this.uploadImage(`sites/${siteId}`, file);
    }
}

async function deleteImage(imgName: string) {
    const blob = bucketAdmin.file(imgName);
    const [{ statusCode, body, statusMessage }] = await blob.delete({ ignoreNotFound: true });
    if (process.env.NODE_ENV === "development") {
        console.log("deleted image");
        console.log("response statusCode: " + statusCode);
        console.log("response statusMessage: " + statusMessage);
        console.log("response body: ");
        console.dir(body, { depth: null });
    }
}

export async function deleteSiteIcon(siteId: string) {
    return await deleteImage(`sites/${siteId}`);
}

export async function deleteUserPhoto(uid: string) {
    return await deleteImage(`users/${uid}`);
}
