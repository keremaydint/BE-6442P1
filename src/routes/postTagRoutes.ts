import { Router } from "express";
import { addTag, deleteTag } from "../controllers/postTagController.js";
const router = Router();

router.post("/posts/:id/tags", addTag);
router.post("/posttags", addTag);

router.delete("/posts/:id/tags", deleteTag);

export default router;
