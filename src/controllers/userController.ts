import { Request, Response } from "express";
import {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../models/userModel.js";

export const addUser = async (req: Request, res: Response) => {
  const { name, username, password } = req.body;

  try {
    const newUser = await createUser({ name, username, password });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: "Failed to create user. Please try again." });
  }
};

export const listUsers = async (req: Request, res: Response) => {
  try {
    const users = await getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users. Please try again." });
  }
};

export const viewUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const user = await getUserById(Number(id));
    if (!user) return res.status(404).json({ error: "User not found." });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user. Please try again." });
  }
};

export const updateUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, username, password } = req.body;

  try {
    const updatedUser = await updateUser(Number(id), {
      name,
      username,
      password,
    });
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ error: "Failed to update user. Please try again." });
  }
};

export const removeUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const deletedUser = await deleteUser(Number(id));
    res.status(200).json(deletedUser);
  } catch (error) {
    res.status(400).json({ error: "Failed to delete user. Please try again." });
  }
};
