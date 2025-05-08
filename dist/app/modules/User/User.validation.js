"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidations = void 0;
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
const createAdmin = zod_1.z.object({
    password: zod_1.z.string({
        required_error: "password is required!",
    }),
    admin: zod_1.z.object({
        name: zod_1.z.string({
            required_error: "name is required!",
        }),
        email: zod_1.z.string({
            required_error: "email is required!",
        }),
        contactNumber: zod_1.z.string({
            required_error: "contactNumber is required!",
        }),
    }),
});
const createMember = zod_1.z.object({
    password: zod_1.z.string({
        required_error: "password is required!",
    }),
    member: zod_1.z.object({
        name: zod_1.z.string({
            required_error: "name is required!",
        }),
        email: zod_1.z.string({
            required_error: "email is required!",
        }),
        contactNumber: zod_1.z.string({
            required_error: "contactNumber is required!",
        }),
        address: zod_1.z.string().optional(),
    }),
});
const updateStatus = zod_1.z.object({
    body: zod_1.z.object({
        status: zod_1.z.enum([client_1.UserStatus.ACTIVE, client_1.UserStatus.BLOCKED, client_1.UserStatus.DELETED]),
    }),
});
exports.UserValidations = {
    createAdmin,
    createMember,
    updateStatus,
};
