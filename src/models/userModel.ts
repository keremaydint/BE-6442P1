import { PrismaClient, User } from "@prisma/client";
import argon2 from "argon2";

const prisma = new PrismaClient();

interface CreateUserParams {
  name: string;
  username: string;
  password: string;
}

interface UpdateUserParams {
  name?: string;
  username?: string;
  password?: string;
}

export const createUser = async ({
  name,
  username,
  password,
}: CreateUserParams): Promise<User> => {
  const hashedPassword = await argon2.hash(password);

  return await prisma.user.create({
    data: {
      name,
      username,
      hashed_password: hashedPassword,
      role: "member",
    },
  });
};

export const getAllUsers = async (): Promise<User[]> => {
  return await prisma.user.findMany({
    where: { deleted_at: null },
  });
};

export const getUserById = async (id: number): Promise<User | null> => {
  return await prisma.user.findUnique({
    where: { id },
  });
};

export const updateUser = async (
  id: number,
  { name, username, password }: UpdateUserParams
): Promise<User> => {
  const data: any = {};
  if (name) data.name = name;
  if (username) data.username = username;
  if (password) data.hashed_password = await argon2.hash(password);

  return await prisma.user.update({
    where: { id },
    data,
  });
};

export const deleteUser = async (id: number): Promise<User> => {
  return await prisma.user.update({
    where: { id },
    data: { deleted_at: new Date() },
  });
};
