import { Router, json } from "express";

import { decodeIDToken, validateRequest } from "../middlewares/validate";
import {
    createSite,
    createSitePage,
    deleteSite,
    deleteSitePage,
    getSite,
    updateSite,
} from "../utils/siteUtils";

const router = Router();

// use middlewares to parse json.
router.use(json());

// Make sure that the user can only access their own data
router.use(decodeIDToken);
router.use(validateRequest);

router.get("/get", getSite);
router.post("/create", createSite);
router.post("/update", updateSite);
router.delete("/delete", deleteSite);

router.post("page/create", createSitePage);
router.delete("page/delete", deleteSitePage);

const siteRouter = router;
export default siteRouter;
