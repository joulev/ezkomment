/**
 * Cast Next Object to Express Object to reuse the code.
 */
import { NextApiRequest, NextApiResponse } from "next";

import * as UserHandlers from "@server/handlers/userHandlers";
import { castNextToExpress } from "@server/utils/extraUtils";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const [expressReq, expressRes] = castNextToExpress(req, res);
    const method = req.method;
    let delegateMethod = undefined;
    if (method === "GET") {
        delegateMethod = UserHandlers.getUser;
    } else if (method === "POST") {
        delegateMethod = UserHandlers.updateUser;
    } else if (method === "DELETE") {
        delegateMethod = UserHandlers.deleteUser;
    }
    if (!delegateMethod) {
        res.status(500).json({ error: "" });
    } else {
        await delegateMethod(expressReq, expressRes);
    }
}
