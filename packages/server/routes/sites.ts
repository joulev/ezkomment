import { Router, json } from "express";

import * as SiteHandlers from "@server/handlers/siteHandler";

import { validateRequest } from "../middlewares/validateRequest";

const router = Router();

// use middlewares to parse json.
router.use(json());

router.route("/").post(SiteHandlers.createSite);

router
    .route("/:siteId")
    .get(SiteHandlers.getSite)
    .post(SiteHandlers.updateSite)
    .delete(SiteHandlers.deleteSite);

const siteRouter = router;
export default siteRouter;
