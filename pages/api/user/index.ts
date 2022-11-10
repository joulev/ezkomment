import { ApiResponse, createHandler, createRouter } from "~/server/next-connect";
import { authAdmin } from "~/server/firebase/app";
import authenticate from "~/server/middlewares/authenticate";
import CustomApiError from "~/server/errors/customApiError";
import { handleUserError } from "~/server/errors/handleAuthError";

const router = createRouter();

router.get(authenticate, async (req, res: ApiResponse<any>) => {
    const { uid } = req;
    if (!uid) throw new CustomApiError("Something's wrong", 500);
    const { email, displayName, photoURL, metadata, providerData } = await authAdmin
        .getUser(uid)
        .catch(handleUserError);
    res.status(200).json({
        uid,
        email,
        displayName,
        photoURL,
        metadata,
        providerData,
        sites: [],
    });
});

export default createHandler(router);
