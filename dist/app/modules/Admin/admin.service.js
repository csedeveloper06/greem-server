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
exports.AdminServices = void 0;
const client_1 = require("@prisma/client");
const pagination_1 = require("../../../helpers/pagination");
const Prisma_1 = __importDefault(require("../../../shared/Prisma"));
const admin_constant_1 = require("./admin.constant");
const getAllAdminsFromDB = (params, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, skip } = pagination_1.paginationHelper.calculatePagination(options);
    const { searchTerm } = params, filterData = __rest(params, ["searchTerm"]);
    const andConditions = [];
    if (params.searchTerm) {
        andConditions.push({
            OR: admin_constant_1.adminSearchableFields.map((field) => ({
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
    const result = yield Prisma_1.default.admin.findMany({
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
    const total = yield Prisma_1.default.admin.count({
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
const getSingleAdminFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield Prisma_1.default.admin.findUnique({
        where: {
            id,
            isDeleted: false,
        },
    });
    return result;
});
const updatedAdminIntoDB = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    yield Prisma_1.default.admin.findUniqueOrThrow({
        where: {
            id,
            isDeleted: false,
        },
    });
    const result = yield Prisma_1.default.admin.update({
        where: {
            id,
        },
        data,
    });
    return result;
});
const deleteAdminFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield Prisma_1.default.admin.findUniqueOrThrow({
        where: {
            id,
        },
    });
    const result = yield Prisma_1.default.$transaction((transactionClent) => __awaiter(void 0, void 0, void 0, function* () {
        const adminDeletedData = yield transactionClent.admin.delete({
            where: {
                id,
            },
        });
        yield transactionClent.user.delete({
            where: {
                email: adminDeletedData.email,
            },
        });
        return adminDeletedData;
    }));
    return result;
});
const softDeleteAdminFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield Prisma_1.default.admin.findUniqueOrThrow({
        where: {
            id,
            isDeleted: false,
        },
    });
    const result = yield Prisma_1.default.$transaction((transactionClent) => __awaiter(void 0, void 0, void 0, function* () {
        const adminDeletedData = yield transactionClent.admin.update({
            where: {
                id,
            },
            data: {
                isDeleted: true,
            },
        });
        yield transactionClent.user.update({
            where: {
                email: adminDeletedData.email,
            },
            data: {
                status: client_1.UserStatus.DELETED,
            },
        });
        return adminDeletedData;
    }));
    return result;
});
exports.AdminServices = {
    getAllAdminsFromDB,
    getSingleAdminFromDB,
    updatedAdminIntoDB,
    deleteAdminFromDB,
    softDeleteAdminFromDB,
};
