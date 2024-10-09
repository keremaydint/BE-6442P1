import { Request, Response } from "express";
import {
  create,
  getAll,
  getById,
  softDelete,
  update,
} from "../models/categoryModel.js";

export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await getAll(req.query);
    res.status(200).json(categories);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch categories. Please try again later." });
  }
};

export const getCategoryById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const category = await getById(Number(id));
    if (!category) {
      return res.status(404).json({ message: "Category not found." });
    } else {
      res.status(200).json(category);
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch category. Please try again later." });
  }
};

export const createCategory = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const newCategory = await create(name);
    res.status(201).json(newCategory);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create category. Please try again later." });
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const updatedCategory = await update(Number(id), name);
    res.status(200).json(updatedCategory);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update category. Please try again later." });
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedCategory = await softDelete(Number(id));
    res.status(200).json(deletedCategory);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete category. Please try again later." });
  }
};
