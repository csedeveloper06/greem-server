import { Request, RequestHandler, Response } from "express";
import httpStatus from "http-status";
import sendResponse from "../../../shared/sendResponse";
import catchAsync from "../../../shared/catchAsync";

import { CommentServices } from "./comment.services";

const createComment = catchAsync(async (req: Request, res: Response) => {
  const result = await CommentServices.createCommentIntoDB(req);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Comment created successfuly!",
    data: result,
  });
});

const getAllComments: RequestHandler = catchAsync(async (req, res) => {
  const result = await CommentServices.getAllCommentsFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Comments fetched successfuly",
    data: result,
  });
});

const getSingleComment = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await CommentServices.getSingleCommentFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Comment retrieved successfully!",
    data: result,
  });
});

const updateComment = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await CommentServices.updatedCommentIntoDB(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Comments updated successfully!",
    data: result,
  });
});

const deleteComment = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await CommentServices.deleteCommentFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Comment deleted successfully!",
    data: result,
  });
});

export const CommentControllers = {
  createComment,
  getAllComments,
  getSingleComment,
  updateComment,
  deleteComment,
};
