import { db } from "../config/db";

async function findMany() {
  return await db.post.findMany({
    select: {
      id: true,
      title: true,
      content: true,
      published: true,
      updatedAt: true,
      active: true,
      createdAt: true,
      author: {
        select: {
          id: true,
          name: true,
          email: true,
          active: true,
        },
      },
    },
  });
}

async function createPost(post: any) {
  let { title, content, authorEmail } = post;

  return await db.post.create({
    data: {
      title,
      content,
      author: {
        connect: { email: authorEmail },
      },
    },
    select: {
      id: true,
      title: true,
      content: true,
      published: true,
      active: true,
      createdAt: true,
      author: {
        select: {
          name: true,
          email: true,
          active: true,
          createdAt: true,
        },
      },
    },
  });
}

async function findPostById(id: number) {
  return await db.post.findUnique({
    where: {
      id,
    },
    include: {
      author: true,
    },
  });
}

async function findPostByAuthor(id: number) {
  return await db.post.findMany({
    where: {
      authorId: id,
    },
  });
}

async function updatePost(post: any) {
  let { id, title, content, authorId } = post;
  return await db.post.update({
    data: {
      title,
      content,
      authorId,
    },
    where: {
      id: id,
    },
  });
}

async function deletePost(id: any) {
  return await db.post.delete({
    where: {
      id: id,
    },
  });
}

export {
  findMany,
  findPostByAuthor,
  findPostById,
  updatePost,
  deletePost,
  createPost,
};
