import { AdminControllers } from "./admin.controller";
import validateRequest from "../../middlewares/validateRequest";
import { adminValidationsSchema } from "./admin.validation";
import express from "express";

const router = express.Router();

router.get("/", AdminControllers.getAllAdmin);

router.get("/:id", AdminControllers.getSingleAdmin);

router.patch(
  "/:id",
  validateRequest(adminValidationsSchema.update),
  AdminControllers.updateAdmin
);

router.delete("/:id", AdminControllers.deleteAdmin);

router.delete("/soft/:id", AdminControllers.softDeleteAdmin);

export const AdminRoutes = router;
