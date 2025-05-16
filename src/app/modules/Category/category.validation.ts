import { CategoryStatus } from "@prisma/client";
import { z } from "zod";

const create = z.object({
  categoryStatus: z.enum([
    CategoryStatus.ENERGY,
    CategoryStatus.TRANSPORTATION,
    CategoryStatus.WASTE,
  ]),
});

export const CategoryValidations = {
  create,
};
