import { Request, Response } from "express";
// import { ReviewServices } from "./review.services";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { TAuthUser } from "../../interfaces/common";

// const createReview = catchAsync(
// async (req: Request & { user?: TAuthUser }, res: Response) => {
//   const user = req.user;
//   const result = await ReviewServices.createReviewIntoDB(
//     user as TAuthUser,
//     req.body
//   );

//     sendResponse(res, {
//       statusCode: httpStatus.OK,
//       success: true,
//       message: "Review created successfuly!",
//       data: result,
//     });
//   }
// );

// export const ReviewControllers = {
//   createReview,
// };
