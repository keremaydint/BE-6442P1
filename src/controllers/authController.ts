import { Request, Response } from "express";
import {
  registerUser,
  loginUser,
  getUserById,
  createRefreshToken,
  deleteRefreshToken,
} from "../models/authModel.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { authorize } from "../cerbosClient.js";

dotenv.config();
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET as string;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET as string;

export const register = async (req: Request, res: Response) => {
  const { name, username, password } = req.body;
  try {
    const newUser = await registerUser(name, username, password);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: "Failed to register user." });
  }
};

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const user = await loginUser(username, password);
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const accessToken = jwt.sign({ userId: user.id }, ACCESS_TOKEN_SECRET, {
      expiresIn: "15m",
    });
    const refreshToken = jwt.sign({ userId: user.id }, REFRESH_TOKEN_SECRET, {
      expiresIn: "7d",
    });
    await createRefreshToken(
      user.id,
      new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    );

    res.json({ accessToken, refreshToken });
  } catch (error) {
    res.status(500).json({ message: "Failed to login user." });
  }
};

export const me = async (req: Request, res: Response) => {
  const userId = (req.user as { userId: number }).userId;
  try {
    const isAuthorized = await authorize(
      { id: userId, roles: ["user"] },
      { kind: "user", id: userId },
      "view"
    );

    if (!isAuthorized) {
      return res.status(403).json({ message: "Access denied" });
    }

    const user = await getUserById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch user." });
  }
};

export const refreshToken = async (req: Request, res: Response) => {
  const { refreshToken } = req.body;
  if (!refreshToken) return res.status(401).json({ message: "Token required" });

  jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, async (error, decoded) => {
    if (error) return res.status(403).json({ message: "Invalid token" });
    const user = await getUserById((decoded as { userId: number }).userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const accessToken = jwt.sign({ userId: user.id }, ACCESS_TOKEN_SECRET, {
      expiresIn: "15m",
    });
    res.json({ accessToken });
  });
};

export const logout = async (req: Request, res: Response) => {
  const { refreshToken } = req.body;
  try {
    await deleteRefreshToken(refreshToken);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: "Failed to logout user." });
  }
};
