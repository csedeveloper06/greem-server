import express from "express";
import { OrderControllers } from "./Order.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";

const router = express.Router();

router.post(
  "/create-order",
  auth(UserRole.MEMBER),
  OrderControllers.createOrder
);

router.get(
  "/",
  auth(UserRole.MEMBER, UserRole.ADMIN, UserRole.SUPER_ADMIN),
  OrderControllers.getAllOrders
);
router.get(
  "/:id",
  auth(UserRole.MEMBER, UserRole.ADMIN, UserRole.SUPER_ADMIN),
  OrderControllers.getSingleOrder
);
router.patch(
  "/:id",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  OrderControllers.updateOrder
);

router.patch(
  "/status/:id",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  OrderControllers.changeOrderStatus
);

router.delete(
  "/:id",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  OrderControllers.deleteOrder
);

export const OrderRoutes = router;
