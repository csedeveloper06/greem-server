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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IdeaServices = void 0;
const Prisma_1 = __importDefault(require("../../../shared/Prisma"));
const fileUploader_1 = require("../../../helpers/fileUploader");
const pagination_1 = require("../../../helpers/pagination");
const idea_constant_1 = require("./idea.constant");
const createIdeaIntoDB = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const file = req.file;
    let ideaData = req.body;
    if (file) {
        const uploadToCloudinary = yield fileUploader_1.fileUploader.uploadToCloudinary(file);
        ideaData.productPhoto = uploadToCloudinary === null || uploadToCloudinary === void 0 ? void 0 : uploadToCloudinary.secure_url;
    }
    if (!ideaData.authorId || !ideaData.categoryId) {
        throw new Error("authorId and categoryId are required");
    }
    const result = yield Prisma_1.default.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        return yield transactionClient.idea.create({
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
    }));
    return result;
});
const getAllIdeasFromDB = (params, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, skip } = pagination_1.paginationHelper.calculatePagination(options);
    const { searchTerm } = params, filterData = __rest(params, ["searchTerm"]);
    const andConditions = [];
    if (params.searchTerm) {
        andConditions.push({
            OR: idea_constant_1.ideaSearchableFields.map((field) => ({
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
                    equals: filterData[key],
                },
            })),
        });
    }
    andConditions.push({
        isDeleted: false,
    });
    const whereConditions = {
        AND: andConditions,
    };
    const result = yield Prisma_1.default.idea.findMany({
        where: whereConditions,
        skip,
        take: limit,
        orderBy: options.sortBy && options.sortOrder
            ? {
                [options.sortBy]: options.sortOrder,
            }
            : {
                createdAt: "desc",
            },
    });
    const total = yield Prisma_1.default.idea.count({
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
});
const getSingleIdeaFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield Prisma_1.default.idea.findUnique({
        where: {
            id,
            isDeleted: false,
        },
    });
    return result;
});
const updatedIdeaIntoDB = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    yield Prisma_1.default.idea.findUniqueOrThrow({
        where: {
            id,
            isDeleted: false,
        },
    });
    const result = yield Prisma_1.default.idea.update({
        where: {
            id,
        },
        data,
    });
    return result;
});
const deleteIdeaFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield Prisma_1.default.idea.findUniqueOrThrow({
        where: {
            id,
        },
    });
    const result = yield Prisma_1.default.$transaction((transactionClent) => __awaiter(void 0, void 0, void 0, function* () {
        const ideaDeletedData = yield transactionClent.idea.delete({
            where: {
                id,
            },
        });
        return ideaDeletedData;
    }));
    return result;
});
const softDeleteIdeaFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield Prisma_1.default.idea.findUniqueOrThrow({
        where: {
            id,
            isDeleted: false,
        },
    });
    const result = yield Prisma_1.default.$transaction((transactionClent) => __awaiter(void 0, void 0, void 0, function* () {
        const ideaDeletedData = yield transactionClent.idea.update({
            where: {
                id,
            },
            data: {
                isDeleted: true,
            },
        });
        return ideaDeletedData;
    }));
    return result;
});
exports.IdeaServices = {
    createIdeaIntoDB,
    getAllIdeasFromDB,
    getSingleIdeaFromDB,
    updatedIdeaIntoDB,
    deleteIdeaFromDB,
    softDeleteIdeaFromDB,
};
