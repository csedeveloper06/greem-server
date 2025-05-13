import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { VoteServices } from "./vote.services";
import { Request, RequestHandler, Response } from "express";

const createVote = catchAsync(async (req: Request, res: Response) => {
  const result = await VoteServices.createVoteIntoDB(req);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Vote created successfuly!",
    data: result,
  });
});

const getAllVotes: RequestHandler = catchAsync(async (req, res) => {
  const result = await VoteServices.getAllVotesFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Votes fetched successfuly",
    data: result,
  });
});

const getSingleVote = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await VoteServices.getSingleVoteFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Vote retrieved successfully!",
    data: result,
  });
});

const deleteVote = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await VoteServices.deleteVoteFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Vote deleted successfully!",
    data: result,
  });
});

export const VoteControllers = {
  createVote,
  getAllVotes,
  getSingleVote,
  deleteVote,
};
