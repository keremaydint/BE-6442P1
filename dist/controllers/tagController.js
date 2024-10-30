import { create, getAll, getById, softDelete, update, } from "../models/tagModel.js";
export const getTags = async (req, res) => {
    try {
        const tags = await getAll();
        res.status(200).json(tags);
    }
    catch (error) {
        res.status(500).json({ message: "Failed to fetch tags." });
    }
};
export const getTagById = async (req, res) => {
    try {
        const { id } = req.params;
        const tag = await getById(Number(id));
        if (!tag) {
            return res.status(404).json({ message: "Tag not found." });
        }
        else {
            res.status(200).json(tag);
        }
    }
    catch (error) {
        res.status(500).json({ message: "Failed to fetch tag." });
    }
};
export const createTag = async (req, res) => {
    try {
        const { name } = req.body;
        const newTag = await create(name);
        res.status(201).json(newTag);
    }
    catch (error) {
        res.status(500).json({ message: "Failed to create tag." });
    }
};
export const updateTag = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        const updatedTag = await update(Number(id), name);
        res.status(200).json(updatedTag);
    }
    catch (error) {
        res.status(500).json({ message: "Failed to update tag." });
    }
};
export const deleteTag = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedTag = await softDelete(Number(id));
        res.status(200).json(deletedTag);
    }
    catch (error) {
        res.status(500).json({ message: "Failed to delete tag." });
    }
};
//# sourceMappingURL=tagController.js.map