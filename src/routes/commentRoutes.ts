import { Router } from "express";
import {
  createComment,
  deleteComment,
  getComments,
  getCommentById,
  updateComment,
} from "../controllers/commentController.js";

const router = Router();

router.get("/", getComments);
router.get("/:id", getCommentById);
router.post("/", createComment);
router.patch("/:id", updateComment);
router.delete("/:id", deleteComment);

export default router;
