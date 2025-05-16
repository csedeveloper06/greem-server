"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IdeaValidations = void 0;
const zod_1 = require("zod");
const createIdea = zod_1.z.object({
    title: zod_1.z.string({ required_error: "Title is required" }),
    categoryId: zod_1.z.string({ required_error: "Category ID is required" }),
    authorId: zod_1.z.string({ required_error: "Author ID is required" }),
    statement: zod_1.z.string({ required_error: "Statement is required" }),
    solution: zod_1.z.string({ required_error: "Solution is required" }),
    description: zod_1.z.string({ required_error: "Description is required" }),
    productPhoto: zod_1.z.string().optional(),
    price: zod_1.z.number().optional(),
});
exports.IdeaValidations = {
    createIdea,
};
