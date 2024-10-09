import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const addTagToPost = async (postId: number, tagId: number) => {
  return await prisma.postTags.create({
    data: {
      post_id: postId,
      tag_id: tagId,
    },
  });
};

export const addTaggor = async (post_id: number, tag_id: number) => {
  return await prisma.postTags.create({
    data: {
      post_id,
      tag_id,
    },
  });
};

export const removeTagFromPost = async (postId: number, tagId: number) => {
  return await prisma.postTags.delete({
    where: {
      post_id_tag_id: {
        post_id: postId,
        tag_id: tagId,
      },
    },
  });
};
