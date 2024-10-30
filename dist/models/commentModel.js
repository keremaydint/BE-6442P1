import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export const getAll = async (query) => {
    const { showDeleted, postId, commenter, tagIds } = query;
    const where = {};
    const filters = {
        true: {},
        false: { deleted_at: null },
        onlyDeleted: { deleted_at: { not: null } },
    };
    if (showDeleted && filters[showDeleted]) {
        Object.assign(where, filters[showDeleted]);
    }
    if (postId) {
        const postIdsArray = postId.toString().split(",").map(Number);
        where.post_id = { in: postIdsArray };
    }
    if (commenter) {
        where.commenter_name = commenter;
    }
    if (tagIds) {
        const tagIdsArray = tagIds.split(",").map(Number);
        const posts = await prisma.post.findMany({
            where: {
                OR: tagIdsArray.map((tagId) => ({
                    post_tags: {
                        some: { tag_id: tagId },
                    },
                })),
            },
        });
        if (posts.length > 0) {
            where.post_id = { in: posts.map((post) => post.id) };
        }
        else {
            return [];
        }
    }
    const comments = await prisma.comment.findMany({
        where,
        include: {
            post: true,
        },
    });
    return comments;
};
export const getById = async (id) => {
    return await prisma.comment.findUnique({
        where: { id },
        include: { post: true },
    });
};
export const create = async (content, commenter_name, post_id) => {
    return await prisma.comment.create({
        data: {
            content,
            commenter_name,
            post_id,
        },
    });
};
export const update = async (id, content, commenter_name) => {
    return await prisma.comment.update({
        where: { id },
        data: {
            content,
            commenter_name,
            updated_at: new Date(),
        },
    });
};
export const softDelete = async (id) => {
    return await prisma.comment.update({
        where: { id },
        data: { deleted_at: new Date() },
    });
};
//# sourceMappingURL=commentModel.js.map