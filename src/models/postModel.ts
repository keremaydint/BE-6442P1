import { PrismaClient, Post } from "@prisma/client";
import { SHOW_DELETED } from "../constant.js";

const prisma = new PrismaClient();

interface PostQuery {
  category?: string;
  showDeleted?: string;
  status?: string;
  tags?: string;
}

export const getAll = async (query: PostQuery) => {
  const { showDeleted, category, status, tags } = query;

  const where: any = {};

  const filters: { [key: string]: any } = {
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
  } else if (status === "draft") {
    where.published_at = null;
  } else if (status === "all") {
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
    return posts.filter((post) =>
      post.post_tags.some((postTag) => tagIds.includes(postTag.tag_id))
    );
  }

  return posts;
};

export const getById = async (id: number): Promise<Post | null> => {
  return await prisma.post.findUnique({
    where: { id },
  });
};

export const create = async (
  title: string,
  content: string,
  category_id: number,
  published_at?: Date
): Promise<Post> => {
  return await prisma.post.create({
    data: {
      title,
      content,
      category_id,
      published_at,
    },
  });
};

export const update = async (
  id: number,
  title: string,
  content: string,
  published_at?: Date
): Promise<Post> => {
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

export const softDelete = async (id: number) => {
  return await prisma.post.update({
    where: { id },
    data: { deleted_at: new Date() },
  });
};
