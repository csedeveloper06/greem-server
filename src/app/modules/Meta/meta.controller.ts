import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { MetaServices } from "./meta.services";
import httpStatus from "http-status";
import { TAuthUser } from "../../interfaces/common";

const fetchDashboardMetaData = catchAsync(
  async (req: Request & { user?: TAuthUser }, res: Response) => {
    const user = req.user;
    const result = await MetaServices.fetchDashboardMetaDataIntoDB(
      user as TAuthUser
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Meta data fetched successfully!",
      data: result,
    });
  }
);

export const MetaControllers = {
  fetchDashboardMetaData,
};
