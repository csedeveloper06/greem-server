import { Request, Response } from "express";
import { UserServices } from "./user.service";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";

const createAdmin = catchAsync(async (req: Request, res: Response) => {
  // console.log("File :", req.file);
  // console.log("Data :", req.body.data);
  const result = await UserServices.createAdminIntoDB(req);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin created successfuly!",
    data: result,
  });
});

export const UserControllers = {
  createAdmin,
};
