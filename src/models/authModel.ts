import { PrismaClient, User } from "@prisma/client";
import argon2 from "argon2";

const prisma = new PrismaClient();

export const registerUser = async (
  name: string,
  username: string,
  password: string
): Promise<User> => {
  const hashedPassword = await argon2.hash(password, { type: argon2.argon2id });
  return await prisma.user.create({
    data: { name, username, hashed_password: hashedPassword },
  });
};

export const loginUser = async (
  username: string,
  password: string
): Promise<User | null> => {
  const user = await prisma.user.findUnique({
    where: { username },
  });

  if (user && (await argon2.verify(user.hashed_password, password))) {
    return user;
  }
  return null;
};

export const getUserById = async (id: number): Promise<User | null> => {
  return await prisma.user.findUnique({
    where: { id },
  });
};

export const createRefreshToken = async (userId: number, expiresAt: Date) => {
  return await prisma.refreshToken.create({
    data: { user_id: userId, expires_at: expiresAt },
  });
};

export const deleteRefreshToken = async (refreshToken: string) => {
  return await prisma.refreshToken.delete({
    where: { token: refreshToken },
  });
};
