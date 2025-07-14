import catchAsync from "../../../shared/catchAsync";
import { OrderServices } from "./Order.services";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { Request, Response } from "express";
import { TAuthUser } from "../../interfaces/common";

const createOrder = catchAsync(
  async (req: Request & { user?: TAuthUser }, res: Response) => {
    const user = req.user;
    const { ideaIds } = req.body;
    const result = await OrderServices.createOrderIntoDB(
      user as TAuthUser,
      ideaIds
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Order created successfuly!",
      data: result,
    });
  }
);

const getAllOrders = catchAsync(async (req, res) => {
  const result = await OrderServices.getAllOrdersFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All orders fetched successfuly!",
    data: result,
  });
});

const getSingleOrder = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await OrderServices.getSingleOrderFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Order fetched successfuly!",
    data: result,
  });
});

const updateOrder = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await OrderServices.updateOrderIntDB(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Updated Order successfuly!",
    data: result,
  });
});

const changeOrderStatus = catchAsync(
  async (req: Request & { user?: TAuthUser }, res: Response) => {
    const { id } = req.params;
    const { orderStatus } = req.body;
    const user = req.user;
    const result = await OrderServices.changeOrderStatusIntDB(
      id,
      orderStatus,
      user as TAuthUser
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Changed order status successfuly!",
      data: result,
    });
  }
);

const deleteOrder = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await OrderServices.deleteOrderFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Order deleted successfuly!",
    data: result,
  });
});

export const OrderControllers = {
  createOrder,
  getAllOrders,
  getSingleOrder,
  updateOrder,
  changeOrderStatus,
  deleteOrder,
};
