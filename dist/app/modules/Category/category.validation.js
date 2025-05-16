"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryValidations = void 0;
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
const create = zod_1.z.object({
    categoryStatus: zod_1.z.enum([
        client_1.CategoryStatus.ENERGY,
        client_1.CategoryStatus.TRANSPORTATION,
        client_1.CategoryStatus.WASTE,
    ]),
});
exports.CategoryValidations = {
    create,
};
