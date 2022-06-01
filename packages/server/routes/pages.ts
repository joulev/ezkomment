import { Router, json } from "express";

import { validateRequest } from "@server/middlewares/validateRequest";

import {
    createPage,
    createPageComment,
    deletePage,
    deletePageComment,
    getPage,
    updatePageComment,
} from "../utils/pageUtils";

const router = Router({
    mergeParams: true,
});
router.use(json());

router.route("/:pageId");

router.route("/:pageId/comments/:commentId");

// router.get("/get", getPage);
// router.post("/create", createPage);
// router.delete("/delete", deletePage);

// router.post("/comment/create", createPageComment);
// router.post("/comment/update", updatePageComment);
// router.delete("/comment/delete", deletePageComment);

const pageRouter = router;
export default pageRouter;
