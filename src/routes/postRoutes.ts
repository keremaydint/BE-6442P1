import { Router } from "express";
import {
  createPost,
  deletePost,
  getPosts,
  getPostById,
  updatePost,
} from "../controllers/postController.js";
import {
  addTag,
  deleteTag,
  addTaggo,
} from "../controllers/postTagController.js";

const router = Router();

// POST routes
router.get("/", getPosts);
router.get("/:id", getPostById);
router.post("/", createPost);
router.patch("/:id", updatePost);
router.delete("/:id", deletePost);

router.post("/:id/tags", addTag);

export default router;
