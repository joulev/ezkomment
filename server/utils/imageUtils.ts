import { bucketAdmin } from "~/server/firebase/firebaseAdmin";

import { FormDataFile } from "~/types/server/nextApi.type";

export async function uploadImage(name: string, file?: FormDataFile) {
    if (!file) {
        throw Error("No data or invalid data");
    }
    const { mimetype, buffer } = file;
    const blob = bucketAdmin.file(name);
    await blob.save(buffer, { contentType: mimetype });
    const [metadata] = await blob.makePublic();
    const url = blob.publicUrl();
    if (process.env.NODE_ENV === "development") {
        console.log("uploaded image!");
        console.log("minetype: " + mimetype);
        console.log("metadata: ");
        console.dir(metadata, { depth: null });
        console.log("url: " + url);
    }
    return url;
}
