import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export const getAll = async (query) => {
    const { showDeleted, category, status, tags } = query;
    const where = {};
    const filters = {
        true: {},
        false: { deleted_at: null },
        onlyDeleted: { deleted_at: { not: null } },
    };
    if (showDeleted && filters[showDeleted]) {
        Object.assign(where, filters[showDeleted]);
    }
    if (category) {
        where.category_id = Number(category);
    }
    if (status === "published") {
        where.published_at = { not: null };
    }
    else if (status === "draft") {
        where.published_at = null;
    }
    else if (status === "all") {
        where.published_at = {};
    }
    const posts = await prisma.post.findMany({
        where,
        include: {
            post_tags: {
                include: {
                    tag: true,
                },
            },
        },
    });
    if (tags) {
        const tagIds = tags.split(",").map(Number);
        return posts.filter((post) => post.post_tags.some((postTag) => tagIds.includes(postTag.tag_id)));
    }
    return posts;
};
export const getById = async (id) => {
    return await prisma.post.findUnique({
        where: { id },
    });
};
export const create = async (title, content, category_id, published_at) => {
    return await prisma.post.create({
        data: {
            title,
            content,
            category_id,
            published_at,
        },
    });
};
export const update = async (id, title, content, published_at) => {
    return await prisma.post.update({
        where: { id },
        data: {
            title,
            content,
            published_at,
            updated_at: new Date(),
        },
    });
};
export const softDelete = async (id) => {
    return await prisma.post.update({
        where: { id },
        data: { deleted_at: new Date() },
    });
};
//# sourceMappingURL=postModel.js.map