import { Request, Response } from "express";
import {
  create,
  getAll,
  getById,
  softDelete,
  update,
} from "../models/postModel.js";

export const getPosts = async (req: Request, res: Response) => {
  try {
    const posts = await getAll(req.query as any);
    res.status(200).json(posts);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch posts. Please try again later." });
  }
};

export const getPostById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const post = await getById(Number(id));
    if (!post) {
      return res.status(404).json({ message: "Post not found." });
    } else {
      res.status(200).json(post);
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch post. Please try again later." });
  }
};

export const createPost = async (req: Request, res: Response) => {
  try {
    const { title, content, category_id, published_at } = req.body;
    const newPost = await create(title, content, category_id, published_at);
    res.status(201).json(newPost);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create post. Please try again later." });
  }
};

export const updatePost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, content, published_at } = req.body;
    const updatedPost = await update(Number(id), title, content, published_at);
    res.status(200).json(updatedPost);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update post. Please try again later." });
  }
};

export const deletePost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedPost = await softDelete(Number(id));
    res.status(200).json(deletedPost);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete post. Please try again later." });
  }
};
