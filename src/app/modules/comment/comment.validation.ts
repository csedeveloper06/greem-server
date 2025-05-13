import { z } from "zod";
const createComment = z.object({
  content: z.string({ required_error: "Title is required" }),
  authorId: z.string({ required_error: "Category ID is required" }),
  ideaId: z.string({ required_error: "Author ID is required" }),
  parentId: z.string().optional(),
});
const updateComment = z.object({
  content: z.string().optional(),
  authorId: z.string().optional(),
  ideaId: z.string().optional(),
  parentId: z.string().optional(),
});

export const CommentValidations = {
  createComment,
  updateComment,
};
