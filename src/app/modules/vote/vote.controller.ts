import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { VoteServices } from "./vote.services";

const createVote = catchAsync(async (req: Request, res: Response) => {
  const result = await VoteServices.createVoteIntoDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Vote created successfuly!",
    data: result,
  });
});

export const VoteControllers = {
  createVote,
};
