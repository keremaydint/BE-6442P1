import { PrismaClient, Tag } from "@prisma/client";

const prisma = new PrismaClient();

export const getAll = async (): Promise<Tag[]> => {
  return await prisma.tag.findMany();
};

export const getById = async (id: number): Promise<Tag | null> => {
  return await prisma.tag.findUnique({
    where: { id },
  });
};

export const create = async (name: string): Promise<Tag> => {
  return await prisma.tag.create({
    data: {
      name,
    },
  });
};

export const update = async (id: number, name: string): Promise<Tag> => {
  return await prisma.tag.update({
    where: { id },
    data: { name },
  });
};

export const softDelete = async (id: number): Promise<Tag> => {
  return await prisma.tag.delete({
    where: { id },
  });
};
