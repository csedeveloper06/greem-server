import { z } from "zod";
import { UserStatus } from "../../../generated/prisma";

const createAdmin = z.object({
  password: z.string({
    required_error: "password is required!",
  }),
  admin: z.object({
    name: z.string({
      required_error: "name is required!",
    }),
    email: z.string({
      required_error: "email is required!",
    }),
    contactNumber: z.string({
      required_error: "contactNumber is required!",
    }),
  }),
});

const createMember = z.object({
  password: z.string({
    required_error: "password is required!",
  }),
  member: z.object({
    name: z.string({
      required_error: "name is required!",
    }),
    email: z.string({
      required_error: "email is required!",
    }),
    contactNumber: z.string({
      required_error: "contactNumber is required!",
    }),
    address: z.string().optional(),
  }),
});

const updateStatus = z.object({
  body: z.object({
    status: z.enum([UserStatus.ACTIVE, UserStatus.BLOCKED, UserStatus.DELETED]),
  }),
});

export const UserValidations = {
  createAdmin,
  createMember,
  updateStatus,
};
