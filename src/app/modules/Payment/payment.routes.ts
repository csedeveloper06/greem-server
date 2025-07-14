import express from "express";
import { PaymentControllers } from "./payment.controller";

const router = express.Router();

router.get("/ipn", PaymentControllers.validatePayment);

router.post("/init-payment/:orderId", PaymentControllers.initPayment);

export const PaymentRoutes = router;
