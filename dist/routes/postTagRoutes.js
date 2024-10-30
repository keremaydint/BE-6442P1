import { Router } from "express";
import { addTag, deleteTag, addTaggo } from "../controllers/postTagController.js";
const router = Router();
router.post("/posts/:id/tags", addTag);
router.post("/posttags", addTaggo);
router.delete("/posts/:id/tags", deleteTag);
export default router;
//# sourceMappingURL=postTagRoutes.js.map