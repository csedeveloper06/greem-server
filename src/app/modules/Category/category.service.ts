import { Request } from "express";
import { fileUploader } from "../../../helpers/fileUploader";
import prisma from "../../../shared/Prisma";
import { TFile } from "../../interfaces/file";
import { Category } from "@prisma/client";

const getAllCategoriesFromDB = async () => {
  const result = await prisma.category.findMany();
  return result;
};

const createCategoryIntoDB = async (req: Request) => {
  const file = req.file as TFile;
  if (file) {
    const uploadToCloudinary = await fileUploader.uploadToCloudinary(file);
    req.body.icon = uploadToCloudinary?.secure_url;
  }

  const result = await prisma.category.create({
    data: req.body,
  });

  return result;
};

const deleteCategoryFromDB = async (id: string) => {
  const result = await prisma.category.delete({
    where: {
      id,
    },
  });
  return result;
};

export const CategoryServices = {
  createCategoryIntoDB,
  getAllCategoriesFromDB,
  deleteCategoryFromDB,
};
