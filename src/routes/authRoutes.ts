import { Router } from "express";
import {
  register,
  login,
  me,
  refreshToken,
  logout,
} from "../controllers/authController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/me", authenticateToken, me);
router.post("/refresh", refreshToken);
router.post("/logout", authenticateToken, logout);

export default router;
