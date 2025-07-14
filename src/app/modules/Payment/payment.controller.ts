import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { PaymentServices } from "./payment.services";

const initPayment = catchAsync(async (req: Request, res: Response) => {
  const { orderId } = req.params;
  const result = await PaymentServices.initPaymentIntoDB(orderId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Payment initiateded successfuly!",
    data: result,
  });
});

const validatePayment = catchAsync(async (req: Request, res: Response) => {
  const result = await PaymentServices.validatePaymentIntoDB(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Payment validated successfuly!",
    data: result,
  });
});

export const PaymentControllers = {
  initPayment,
  validatePayment,
};
