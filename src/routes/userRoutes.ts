import { Router } from "express";
import {
  addUser,
  listUsers,
  viewUser,
  updateUserById,
  removeUser,
} from "../controllers/userController.js";

const router = Router();

router.get("/", listUsers);
router.get("/:id", viewUser);
router.post("/", addUser);
router.patch("/:id", updateUserById);
router.delete("/:id", removeUser);

export default router;
