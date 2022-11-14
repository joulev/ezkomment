import { createRouter, createHandler, logError } from "~/server/next-connect";

const router = createRouter();
router.post(async (req, res) => {
    const sendErr = await logError(req.body);
    if (sendErr.ok) return res.status(200).json({ message: "Error has been logged" });
    res.status(500).json({
        error: "Errors couldn't be logged. Please contact us at joulev.vvd@yahoo.com.",
    });
});

export default createHandler(router);
