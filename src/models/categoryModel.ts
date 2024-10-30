import { PrismaClient, Category } from "@prisma/client";

const prisma = new PrismaClient();
interface CategoryQuery {
  showDeleted?: string;
}

export const getAll = async (query: CategoryQuery) => {
  const { showDeleted } = query;
  const where: any = {};

  const filters: { [key: string]: any } = {
    true: {},
    false: { deleted_at: null },
    onlyDeleted: { deleted_at: { not: null } },
  };

  if (showDeleted && filters[showDeleted]) {
    Object.assign(where, filters[showDeleted]);
  }

  return await prisma.category.findMany({ where });
};

export const getById = async (id: number): Promise<Category | null> => {
  return await prisma.category.findUnique({
    where: { id: Number(id) },
  });
};

export const create = async (name: string) => {
  return await prisma.category.create({
    data: { name },
  });
};

export const update = async (id: number, name: string) => {
  return await prisma.category.update({
    where: { id: Number(id) },
    data: { name },
  });
};

export const softDelete = async (id: number) => {
  return await prisma.category.update({
    where: { id: Number(id) },
    data: { deleted_at: new Date() },
  });
};
