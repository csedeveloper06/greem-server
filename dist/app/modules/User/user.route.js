"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const prisma_1 = require("../../../generated/prisma");
const fileUploader_1 = require("../../../helpers/fileUploader");
const cloudinary_1 = require("cloudinary");
const router = express_1.default.Router();
cloudinary_1.v2.config({
    cloud_name: "dnzqu88pz",
    secure: true,
    api_key: "792482122157778",
    api_secret: "kkjhxerszs_vfdxctryjlk",
});
// Upload an image
cloudinary_1.v2.uploader.upload("https://i.ibb.co.com/h7PVFkH/mental2.jpg", {
    public_id: "mental2",
}, function (error, result) {
    if (error) {
        console.error("Upload error:", error);
    }
    else {
        console.log("Upload result:", result);
    }
});
router.post("/", (0, auth_1.default)(prisma_1.UserRole.SUPER_ADMIN, prisma_1.UserRole.ADMIN), fileUploader_1.fileUploader.upload.single("file"), user_controller_1.UserControllers.createAdmin);
exports.UserRoutes = router;
