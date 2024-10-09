import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAll = async () => {
  return await prisma.category.findMany();
};

export const getById = async (id: number) => {
  return await prisma.category.findUnique({
    where: { id },
  });
};

export const create = async (name: string) => {
  return await prisma.category.create({
    data: { name },
  });
};

export const update = async (id: number, name: string) => {
  return await prisma.category.update({
    where: { id },
    data: { name },
  });
};

export const softDelete = async (id: number) => {
  return await prisma.category.update({
    where: { id },
    data: { deleted_at: new Date() },
  });
};
