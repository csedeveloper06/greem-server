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
exports.CategoryServices = void 0;
const fileUploader_1 = require("../../../helpers/fileUploader");
const Prisma_1 = __importDefault(require("../../../shared/Prisma"));
const getAllCategoriesFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield Prisma_1.default.category.findMany();
    return result;
});
const createCategoryIntoDB = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const existingCategory = yield Prisma_1.default.category.findFirst({
        where: {
            categoryStatus: req.body.categoryStatus,
        },
    });
    if (existingCategory) {
        throw new Error("Category with this name already exists.");
    }
    const file = req.file;
    if (file) {
        const uploadToCloudinary = yield fileUploader_1.fileUploader.uploadToCloudinary(file);
        req.body.icon = uploadToCloudinary === null || uploadToCloudinary === void 0 ? void 0 : uploadToCloudinary.secure_url;
    }
    const result = yield Prisma_1.default.category.create({
        data: req.body,
    });
    return result;
});
const deleteCategoryFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield Prisma_1.default.category.delete({
        where: {
            id,
        },
    });
    return result;
});
exports.CategoryServices = {
    createCategoryIntoDB,
    getAllCategoriesFromDB,
    deleteCategoryFromDB,
};
