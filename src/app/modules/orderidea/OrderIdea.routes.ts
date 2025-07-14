import express from "express";
import { OrderIdeaControllers } from "./OrderIdea.controller";

const router = express.Router();

router.get("/", OrderIdeaControllers.getAllOrderIdea);

router.get("/:orderId/:ideaId", OrderIdeaControllers.getSingleOrderIdea);


export const OrderIdeaRoutes = router;
