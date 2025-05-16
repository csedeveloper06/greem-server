import { PaymentStatus } from "@prisma/client";
import { z } from "zod";
const createIdea = z.object({
  title: z.string({ required_error: "Title is required" }),
  categoryId: z.string({ required_error: "Category ID is required" }),
  authorId: z.string({ required_error: "Author ID is required" }),
  statement: z.string({ required_error: "Statement is required" }),
  solution: z.string({ required_error: "Solution is required" }),
  description: z.string({ required_error: "Description is required" }),
  productPhoto: z.string().optional(),
  paymentStatus: z.enum([PaymentStatus.FREE, PaymentStatus.PAID]),
  price: z.number().optional(),
  isPaid: z.boolean(),
});

export const IdeaValidations = {
  createIdea,
};
