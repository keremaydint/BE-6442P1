import { Router } from "express";
import {
  createTag,
  deleteTag,
  getTags,
  getTagById,
  updateTag,
} from "../controllers/tagController.js";

const router = Router();

router.get("/", getTags);
router.get("/:id", getTagById);
router.post("/", createTag);
router.patch("/:id", updateTag);
router.delete("/:id", deleteTag);

export default router;
