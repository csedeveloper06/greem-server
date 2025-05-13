import { Vote, VoteType } from "@prisma/client";
import prisma from "../../../shared/Prisma";
import { Request } from "express";

const createVoteIntoDB = async (req: Request): Promise<Vote> => {
  const voteData = req.body;
  console.log(voteData);

  const result = await prisma.$transaction(async (transactionClient) => {
    return await transactionClient.vote.create({
      data: {
        voteType: voteData.voteType,
        userId: voteData.userId,
        ideaId: voteData.ideaId,
      },
    });
  });
  return result;
};

const getAllVotesFromDB = async () => {
  const result = await prisma.vote.findMany({});
  return result;
};

const getSingleVoteFromDB = async (id: string): Promise<Vote | null> => {
  const result = await prisma.vote.findUnique({
    where: {
      id,
    },
  });
  return result;
};

const deleteVoteFromDB = async (id: string): Promise<Vote | null> => {
  await prisma.vote.findUniqueOrThrow({
    where: {
      id,
    },
  });
  const result = await prisma.$transaction(async (transactionClent) => {
    const voteDeletedData = await transactionClent.vote.delete({
      where: {
        id,
      },
    });
    return voteDeletedData;
  });
  return result;
};

export const VoteServices = {
  createVoteIntoDB,
  getAllVotesFromDB,
  getSingleVoteFromDB,
  deleteVoteFromDB,
};
