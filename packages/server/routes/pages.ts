import { Router, json } from "express";

import * as PageHandlers from "@server/handlers/pageHandlers";

const router = Router({
    mergeParams: true,
});

router.use(json());

router.route("/").post(PageHandlers.createPage);

router
    .route("/:pageId")
    .get(PageHandlers.getPage)
    .post(PageHandlers.updatePage)
    .delete(PageHandlers.deletePage);

router.route("/:pageId/comments").post(PageHandlers.createPageComment);

// Currently, we do not support getting a single comment
router
    .route("/:pageId/comments/:commentId")
    .post(PageHandlers.updatePageComment)
    .delete(PageHandlers.deletePageComment);

// router.get("/get", getPage);
// router.post("/create", createPage);
// router.delete("/delete", deletePage);

// router.post("/comment/create", createPageComment);
// router.post("/comment/update", updatePageComment);
// router.delete("/comment/delete", deletePageComment);

const pageRouter = router;
export default pageRouter;
