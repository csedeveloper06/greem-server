import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { AuthServices } from "./auth.service";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthServices.loginUserIntoDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User loggedIn successfuly!",
    data: result,
  });
});

export const AuthControllers = {
  loginUser,
};
