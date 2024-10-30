import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export const getAll = async () => {
    return await prisma.tag.findMany();
};
export const getById = async (id) => {
    return await prisma.tag.findUnique({
        where: { id },
    });
};
export const create = async (name) => {
    return await prisma.tag.create({
        data: {
            name,
        },
    });
};
export const update = async (id, name) => {
    return await prisma.tag.update({
        where: { id },
        data: { name },
    });
};
export const softDelete = async (id) => {
    return await prisma.tag.delete({
        where: { id },
    });
};
//# sourceMappingURL=tagModel.js.map