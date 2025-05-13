import { Request, RequestHandler, Response } from "express";
import pick from "../../../shared/pick";
import httpStatus from "http-status";
import sendResponse from "../../../shared/sendResponse";
import catchAsync from "../../../shared/catchAsync";
import { IdeaServices } from "./idea.services";
import { ideaFilterableFields } from "./idea.constant";

const createIdea = catchAsync(async (req: Request, res: Response) => {
  const result = await IdeaServices.createIdeaIntoDB(req);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Idea created successfuly!",
    data: result,
  });
});

const getAllIdeas: RequestHandler = catchAsync(async (req, res) => {
  const filters = pick(req.query, ideaFilterableFields);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
  console.log(options);

  const result = await IdeaServices.getAllIdeasFromDB(filters, options);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "ideas fetched successfuly",
    meta: result.meta,
    data: result.data,
  });
});

const getSingleIdea = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await IdeaServices.getSingleIdeaFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Idea retrieved successfully!",
    data: result,
  });
});

const updateIdea = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await IdeaServices.updatedIdeaIntoDB(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Ideas updated successfully!",
    data: result,
  });
});

const deleteIdea = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await IdeaServices.deleteIdeaFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Idea deleted successfully!",
    data: result,
  });
});

const softDeleteIdea = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await IdeaServices.softDeleteIdeaFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Idea soft deleted successfuly!",
    data: result,
  });
});

export const IdeaControllers = {
  createIdea,
  getAllIdeas,
  getSingleIdea,
  updateIdea,
  deleteIdea,
  softDeleteIdea,
};
