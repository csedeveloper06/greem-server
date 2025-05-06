import { Request, Response } from "express";
import { UserServices } from "./user.service";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import pick from "../../../shared/pick";
import { userFilterableFields } from "./user.constant";
import { TAuthUser } from "../../interfaces/common";

const createAdmin = catchAsync(async (req: Request, res: Response) => {
  const result = await UserServices.createAdminIntoDB(req);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin created successfuly!",
    data: result,
  });
});
const createMember = catchAsync(async (req: Request, res: Response) => {
  const result = await UserServices.createMemberIntoDB(req);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Member created successfuly!",
    data: result,
  });
});

const getAllUsers = catchAsync(async (req, res) => {
  const filters = pick(req.query, userFilterableFields);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);

  const result = await UserServices.getAllUsersFromDB(filters, options);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "userss fetched successfuly",
    meta: result.meta,
    data: result.data,
  });
});

const changeProfileStatus = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await UserServices.changeProfileStatusIntoDB(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "users profile status changed!",
    data: result,
  });
});

const getMyProfile = catchAsync(
  async (req: Request & { user?: TAuthUser }, res: Response) => {
    const user = req.user;
    const result = await UserServices.getMyProfileIntoDB(user as TAuthUser);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "My profile data fetched!",
      data: result,
    });
  }
);

const updateMyProfile = catchAsync(
  async (req: Request & { user?: TAuthUser }, res: Response) => {
    const user = req?.user;
    const result = await UserServices.updateMyProfileIntoDB(
      user as TAuthUser,
      req
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "My profile data updated!",
      data: result,
    });
  }
);

export const UserControllers = {
  createAdmin,
  createMember,
  getAllUsers,
  changeProfileStatus,
  getMyProfile,
  updateMyProfile,
};
