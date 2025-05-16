"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentValidations = void 0;
const zod_1 = require("zod");
const createComment = zod_1.z.object({
    content: zod_1.z.string({ required_error: "Title is required" }),
    authorId: zod_1.z.string({ required_error: "Category ID is required" }),
    ideaId: zod_1.z.string({ required_error: "Author ID is required" }),
    parentId: zod_1.z.string().optional(),
});
const updateComment = zod_1.z.object({
    content: zod_1.z.string().optional(),
    authorId: zod_1.z.string().optional(),
    ideaId: zod_1.z.string().optional(),
    parentId: zod_1.z.string().optional(),
});
exports.CommentValidations = {
    createComment,
    updateComment,
};
