import { PrismaClient, Comment } from "@prisma/client";

const prisma = new PrismaClient();
interface CommentQuery {
  postId?: number;
  commenter?: string;
  showDeleted?: string;
  tagIds?: string;
}

export const getAll = async (query: CommentQuery) => {
  const { showDeleted, postId, commenter, tagIds } = query;

  const where: any = {};

  const filters: { [key: string]: any } = {
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
    } else {
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

export const getById = async (id: number): Promise<Comment | null> => {
  return await prisma.comment.findUnique({
    where: { id },
    include: { post: true },
  });
};

export const create = async (
  content: string,
  commenter_name: string,
  post_id: number
): Promise<Comment> => {
  return await prisma.comment.create({
    data: {
      content,
      commenter_name,
      post_id,
    },
  });
};

export const update = async (
  id: number,
  content: string,
  commenter_name?: string
): Promise<Comment> => {
  return await prisma.comment.update({
    where: { id },
    data: {
      content,
      commenter_name,
      updated_at: new Date(),
    },
  });
};

export const softDelete = async (id: number) => {
  return await prisma.comment.update({
    where: { id },
    data: { deleted_at: new Date() },
  });
};
