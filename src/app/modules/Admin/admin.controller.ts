import { Request, Response } from "express";
import { AdminServices } from "./admin.service";

const getAllAdmin = async (req: Request, res: Response) => {
  try {
    //   console.log(req.query);
    const result = await AdminServices.getAllAdminsFromDB(req.query);
    res.status(200).json({
      success: true,
      message: "admins retrieved successfully!",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.name || "something went wrong",
      error: err,
    });
  }
};

export const AdminControllers = {
  getAllAdmin,
};
