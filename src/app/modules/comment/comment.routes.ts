import express, { NextFunction, Request, Response } from "express";
import { CommentControllers } from "./comment.controller";
import { CommentValidations } from "./comment.validation";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";

const router = express.Router();

router.get("/", CommentControllers.getAllComments);

router.get("/:id", CommentControllers.getSingleComment);

router.post(
  "/create-comment",
  (req: Request, res: Response, next: NextFunction) => {
    req.body = CommentValidations.createComment.parse(req.body);
    return CommentControllers.createComment(req, res, next);
  }
);

router.patch(
  "/:id",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.MEMBER),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = CommentValidations.updateComment.parse(req.body);
    return CommentControllers.updateComment(req, res, next);
  }
);

router.delete(
  "/:id",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  CommentControllers.deleteComment
);

export const CommentRoutes = router;
