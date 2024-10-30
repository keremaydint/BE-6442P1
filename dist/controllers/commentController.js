import { create, getAll, getById, softDelete, update, } from "../models/commentModel.js";
export const getComments = async (req, res) => {
    try {
        const comments = await getAll(req.query);
        res.status(200).json(comments);
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Failed to fetch comments. Please try again later." });
    }
};
export const getCommentById = async (req, res) => {
    try {
        const { id } = req.params;
        const comment = await getById(Number(id));
        if (!comment) {
            return res.status(404).json({ message: "Comment not found." });
        }
        else {
            res.status(200).json(comment);
        }
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Failed to fetch comment. Please try again later." });
    }
};
export const createComment = async (req, res) => {
    try {
        const { content, commenter_name, post_id } = req.body;
        const newComment = await create(content, commenter_name, post_id);
        res.status(201).json(newComment);
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Failed to create comment. Please try again later." });
    }
};
export const updateComment = async (req, res) => {
    try {
        const { id } = req.params;
        const { content, commenter_name } = req.body;
        const updatedComment = await update(Number(id), content, commenter_name);
        res.status(200).json(updatedComment);
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Failed to update comment. Please try again later." });
    }
};
export const deleteComment = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedComment = await softDelete(Number(id));
        res.status(200).json(deletedComment);
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Failed to delete comment. Please try again later." });
    }
};
//# sourceMappingURL=commentController.js.map