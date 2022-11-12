/**
 * A middleware to parse form data for file uploads.
 *
 * Currently, the parsed data will be stored in a temporary buffer in memory before being uploaded
 * into Firebase Storage.
 *
 * In the future I may consider busboy to pipe the data directly from the request to Firebase
 * Storage. But parsing the form data is not simple...
 */
import multer, { memoryStorage } from "multer";
import { ApiMiddleware } from "~/server/next-connect";

const upload = multer({ storage: memoryStorage() });

/**
 * Parse user's photo.
 */
export const parsePhoto: ApiMiddleware = upload.single("photo") as any;

/**
 * Parse site's icon.
 */
export const parseSiteIcon: ApiMiddleware = upload.single("icon") as any;
