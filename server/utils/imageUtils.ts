import { bucketAdmin } from "~/server/firebase/firebaseAdmin";

import { FormDataFile } from "~/types/server/nextApi.type";

export function getImagePublicUrl(imgName: string) {
    const url = bucketAdmin.file(imgName).publicUrl();
    if (process.env.NODE_ENV === "development") {
        console.log("url: " + url);
    }
    return url;
}

export async function uploadImage(imgName: string, file?: FormDataFile) {
    if (!file) {
        throw Error("No file to upload!");
    }
    const { mimetype, buffer } = file;
    const blob = bucketAdmin.file(imgName);
    await blob.save(buffer, { contentType: mimetype });
    const [metadata] = await blob.makePublic();
    if (process.env.NODE_ENV === "development") {
        console.log("uploaded image!");
        console.log("minetype: " + mimetype);
        console.log("metadata: ");
        console.dir(metadata, { depth: null });
    }
}

export async function deleteImage(imgName: string) {
    const blob = bucketAdmin.file(imgName);
    const [{ statusCode, body, statusMessage }] = await blob.delete({ ignoreNotFound: false });
    if (process.env.NODE_ENV === "development") {
        console.log("deleted image");
        console.log("response statusCode: " + statusCode);
        console.log("response statusMessage: " + statusMessage);
        console.log("response body: ");
        console.dir(body, { depth: null });
    }
}
