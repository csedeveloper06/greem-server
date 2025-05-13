import { UserRole } from "@prisma/client";
import express, { NextFunction, Request, Response } from "express";
import auth from "../../middlewares/auth";
import { fileUploader } from "../../../helpers/fileUploader";
import { IdeaValidations } from "./idea.validation";
import { IdeaControllers } from "./idea.controller";

const router = express.Router();

router.get("/", IdeaControllers.getAllIdeas);

router.get("/:id", IdeaControllers.getSingleIdea);

router.post(
  "/create-idea",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.MEMBER),
  fileUploader.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    const ideaData = JSON.parse(req.body.data);
    req.body = IdeaValidations.createIdea.parse(ideaData);
    return IdeaControllers.createIdea(req, res, next);
  }
);

router.patch(
  "/:id",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.MEMBER),
  fileUploader.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    return IdeaControllers.updateIdea(req, res, next);
  }
);

router.delete(
  "/:id",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  IdeaControllers.deleteIdea
);

router.delete(
  "/soft/:id",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  IdeaControllers.softDeleteIdea
);

export const IdeaRoutes = router;
