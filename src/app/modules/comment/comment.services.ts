import { Comment } from "@prisma/client";
import prisma from "../../../shared/Prisma";
import { Request } from "express";

interface CreateCommentInput {
  content: string;
  authorId: string;
  ideaId: string;
  parentId?: string | null;
}

const createCommentIntoDB = async (req: Request): Promise<Comment> => {
  let commentData: CreateCommentInput = req.body;
  console.log(commentData);
  const result = await prisma.$transaction(async (transactionClient) => {
    return await transactionClient.comment.create({
      data: {
        content: commentData.content,
        authorId: commentData.authorId,
        ideaId: commentData.ideaId,
        parentId: commentData.parentId || null,
      },
    });
  });
  return result;
};

const getAllCommentsFromDB = async () => {
  const result = await prisma.comment.findMany({});
  return result;
};

const getSingleCommentFromDB = async (id: string): Promise<Comment | null> => {
  const result = await prisma.comment.findUnique({
    where: {
      id,
      isDeleted: false,
    },
  });
  return result;
};

const updatedCommentIntoDB = async (
  id: string,
  data: Partial<Comment>
): Promise<Comment> => {
  await prisma.comment.findUniqueOrThrow({
    where: {
      id,
      isDeleted: false,
    },
  });
  const result = await prisma.comment.update({
    where: {
      id,
    },
    data,
  });
  return result;
};

const deleteCommentFromDB = async (id: string): Promise<Comment | null> => {
  await prisma.comment.findUniqueOrThrow({
    where: {
      id,
    },
  });
  const result = await prisma.$transaction(async (transactionClent) => {
    const commentDeletedData = await transactionClent.comment.delete({
      where: {
        id,
      },
    });
    return commentDeletedData;
  });
  return result;
};

export const CommentServices = {
  createCommentIntoDB,
  getAllCommentsFromDB,
  getSingleCommentFromDB,
  updatedCommentIntoDB,
  deleteCommentFromDB,
};
