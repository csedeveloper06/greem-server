import { Idea, Prisma } from "@prisma/client";
import prisma from "../../../shared/Prisma";
import { TFile } from "../../interfaces/file";
import { fileUploader } from "../../../helpers/fileUploader";
import { Request } from "express";
import { TIdeaFilterRequest } from "./idea.interface";
import { TPaginationsOptions } from "../../interfaces/paginationInterface";
import { paginationHelper } from "../../../helpers/pagination";
import { ideaSearchableFields } from "./idea.constant";

const createIdeaIntoDB = async (req: Request): Promise<Idea> => {
  const file = req.file as TFile;
  let ideaData = req.body;
  if (file) {
    const uploadToCloudinary = await fileUploader.uploadToCloudinary(file);
    ideaData.productPhoto = uploadToCloudinary?.secure_url;
  }
  if (!ideaData.authorId || !ideaData.categoryId) {
    throw new Error("authorId and categoryId are required");
  }

  const result = await prisma.$transaction(async (transactionClient) => {
    return await transactionClient.idea.create({
      data: {
        title: ideaData.title,
        statement: ideaData.statement,
        solution: ideaData.solution,
        description: ideaData.description,
        productPhoto: ideaData.productPhoto,
        price: ideaData.price,
        authorId: ideaData.authorId,
        categoryId: ideaData.categoryId,
      },
    });
  });

  return result;
};

const getAllIdeasFromDB = async (
  params: TIdeaFilterRequest,
  options: TPaginationsOptions
) => {
  const { page, limit, skip } = paginationHelper.calculatePagination(options);
  const { searchTerm, ...filterData } = params;
  const andConditions: Prisma.IdeaWhereInput[] = [];
  if (params.searchTerm) {
    andConditions.push({
      OR: ideaSearchableFields.map((field) => ({
        [field]: {
          contains: params.searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map((key) => ({
        [key]: {
          equals: (filterData as any)[key],
        },
      })),
    });
  }

  andConditions.push({
    isDeleted: false,
  });

  const whereConditions: Prisma.IdeaWhereInput = {
    AND: andConditions,
  };

  const result = await prisma.idea.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : {
            createdAt: "desc",
          },
  });

  const total = await prisma.idea.count({
    where: whereConditions,
  });

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleIdeaFromDB = async (id: string): Promise<Idea | null> => {
  const result = await prisma.idea.findUnique({
    where: {
      id,
      isDeleted: false,
    },
  });
  return result;
};

const updatedIdeaIntoDB = async (
  id: string,
  data: Partial<Idea>
): Promise<Idea> => {
  await prisma.idea.findUniqueOrThrow({
    where: {
      id,
      isDeleted: false,
    },
  });
  const result = await prisma.idea.update({
    where: {
      id,
    },
    data,
  });
  return result;
};

const deleteIdeaFromDB = async (id: string): Promise<Idea | null> => {
  await prisma.idea.findUniqueOrThrow({
    where: {
      id,
    },
  });
  const result = await prisma.$transaction(async (transactionClent) => {
    const ideaDeletedData = await transactionClent.idea.delete({
      where: {
        id,
      },
    });
    return ideaDeletedData;
  });
  return result;
};

const softDeleteIdeaFromDB = async (id: string): Promise<Idea | null> => {
  await prisma.idea.findUniqueOrThrow({
    where: {
      id,
      isDeleted: false,
    },
  });
  const result = await prisma.$transaction(async (transactionClent) => {
    const ideaDeletedData = await transactionClent.idea.update({
      where: {
        id,
      },
      data: {
        isDeleted: true,
      },
    });
    return ideaDeletedData;
  });
  return result;
};

export const IdeaServices = {
  createIdeaIntoDB,
  getAllIdeasFromDB,
  getSingleIdeaFromDB,
  updatedIdeaIntoDB,
  deleteIdeaFromDB,
  softDeleteIdeaFromDB,
};
