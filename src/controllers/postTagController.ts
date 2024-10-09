import { Request, Response } from "express";
import {
  addTaggor,
  addTagToPost,
  removeTagFromPost,
} from "../models/postTagModel.js";

export const addTag = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { tagId } = req.body;
    const newPostTag = await addTagToPost(Number(id), tagId);
    res.status(201).json(newPostTag);
    console.log("Post ID:", id, "Tag ID:", tagId);
  } catch (error) {
    res.status(500).json({ message: "Failed to add tag to post." });
  }
};

export const addTaggo = async (req: Request, res: Response) => {
  try {
    // const { id } = req.params;
    const { post_id, tag_id } = req.body;
    console.log(post_id, tag_id);
    const newPostTag = await addTaggor(Number(post_id), Number(tag_id));
    res.status(201).json(newPostTag);
    console.log("Post ID:", post_id, "Tag ID:", tag_id);
  } catch (error) {
    res.status(500).json({ message: "Failed to add tag to post." });
  }
};

export const deleteTag = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { tagId } = req.body;
    await removeTagFromPost(Number(id), tagId);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Failed to delete tag from post." });
  }
};
