import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { OrderIdeasServices } from "./OrderIdea.services";

// const createOrderIdea = catchAsync(async (req, res) => {
//   const result = await OrderIdeasServices.createOrderIdeaIntoDB(req.body);
//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: "OrderIdea created successfuly!",
//     data: result,
//   });
// });

const getAllOrderIdea = catchAsync(async (req, res) => {
  const result = await OrderIdeasServices.getAllOrderIdeasFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "OrderIdea fetched successfuly!",
    data: result,
  });
});

const getSingleOrderIdea = catchAsync(async (req, res) => {
  const { orderId, ideaId } = req.params;
  const result = await OrderIdeasServices.getSingleOrderIdeaFromDB(
    orderId,
    ideaId
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "OrderIdea created successfuly!",
    data: result,
  });
});

// const updateOrderIdea = catchAsync(async (req, res) => {
//   const result = await OrderIdeasServices.updateOrderIdeasIntoDB();
//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: "OrderIdea created successfuly!",
//     data: result,
//   });
// });

// const deleteOrderIdea = catchAsync(async (req, res) => {
//   const result = await OrderIdeasServices.deleteOrderIdeasFromDB();
//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: "OrderIdea created successfuly!",
//     data: result,
//   });
// });

export const OrderIdeaControllers = {
  getAllOrderIdea,
  getSingleOrderIdea,
};
