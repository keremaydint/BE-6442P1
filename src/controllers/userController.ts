import { Request, Response } from "express";
import { findAllUsers } from "../models/userModel.js";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await findAllUsers();
    res.render("users", { users });
  } catch (error) {
    console.log(error);
    res.status(400).send("Error, check logs");
  }
};
