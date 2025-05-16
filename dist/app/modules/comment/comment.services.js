"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentServices = void 0;
const Prisma_1 = __importDefault(require("../../../shared/Prisma"));
const createCommentIntoDB = (req) => __awaiter(void 0, void 0, void 0, function* () {
    let commentData = req.body;
    console.log(commentData);
    const result = yield Prisma_1.default.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        return yield transactionClient.comment.create({
            data: {
                content: commentData.content,
                authorId: commentData.authorId,
                ideaId: commentData.ideaId,
                parentId: commentData.parentId || null,
            },
        });
    }));
    return result;
});
const getAllCommentsFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield Prisma_1.default.comment.findMany({});
    return result;
});
const getSingleCommentFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield Prisma_1.default.comment.findUnique({
        where: {
            id,
            isDeleted: false,
        },
    });
    return result;
});
const updatedCommentIntoDB = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    yield Prisma_1.default.comment.findUniqueOrThrow({
        where: {
            id,
            isDeleted: false,
        },
    });
    const result = yield Prisma_1.default.comment.update({
        where: {
            id,
        },
        data,
    });
    return result;
});
const deleteCommentFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield Prisma_1.default.comment.findUniqueOrThrow({
        where: {
            id,
        },
    });
    const result = yield Prisma_1.default.$transaction((transactionClent) => __awaiter(void 0, void 0, void 0, function* () {
        const commentDeletedData = yield transactionClent.comment.delete({
            where: {
                id,
            },
        });
        return commentDeletedData;
    }));
    return result;
});
exports.CommentServices = {
    createCommentIntoDB,
    getAllCommentsFromDB,
    getSingleCommentFromDB,
    updatedCommentIntoDB,
    deleteCommentFromDB,
};
