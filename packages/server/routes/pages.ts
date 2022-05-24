import { Router, json } from "express";

import { decodeIDToken, validateRequest } from "../middlewares/validate";
import {
    createPage,
    createPageComment,
    deletePage,
    deletePageComment,
    getPage,
    updatePageComment,
} from "../utils/pageUtils";

const router = Router();
router.use(json());

router.use(decodeIDToken);
router.use(validateRequest);

router.get("/get", getPage);
router.post("/create", createPage);
router.delete("/delete", deletePage);

router.post("/comment/create", createPageComment);
router.post("/comment/update", updatePageComment);
router.delete("/comment/delete", deletePageComment);

const pageRouter = router;
export default pageRouter;
