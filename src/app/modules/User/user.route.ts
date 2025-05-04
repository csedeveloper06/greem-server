import express, { NextFunction, Request, Response } from "express";
import { UserControllers } from "./user.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "../../../generated/prisma";
import { fileUploader } from "../../../helpers/fileUploader";
import { UserValidations } from "./User.validation";

const router = express.Router();

router.post(
  "/",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  fileUploader.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = UserValidations.createAdmin.parse(JSON.parse(req.body.data));
    return UserControllers.createAdmin(req, res, next);
  }
);

export const UserRoutes = router;
