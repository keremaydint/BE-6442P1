import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export const getAll = async (query) => {
    const { showDeleted } = query;
    const where = {};
    const filters = {
        true: {},
        false: { deleted_at: null },
        onlyDeleted: { deleted_at: { not: null } },
    };
    if (showDeleted && filters[showDeleted]) {
        Object.assign(where, filters[showDeleted]);
    }
    return await prisma.category.findMany({ where });
};
export const getById = async (id) => {
    return await prisma.category.findUnique({
        where: { id: Number(id) },
    });
};
export const create = async (name) => {
    return await prisma.category.create({
        data: { name },
    });
};
export const update = async (id, name) => {
    return await prisma.category.update({
        where: { id: Number(id) },
        data: { name },
    });
};
export const softDelete = async (id) => {
    return await prisma.category.update({
        where: { id: Number(id) },
        data: { deleted_at: new Date() },
    });
};
//# sourceMappingURL=categoryModel.js.map