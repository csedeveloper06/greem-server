"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const fileUploader_1 = require("../../../helpers/fileUploader");
const User_validation_1 = require("./User.validation");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const client_1 = require("@prisma/client");
const router = express_1.default.Router();
router.get("/", (0, auth_1.default)(client_1.UserRole.SUPER_ADMIN, client_1.UserRole.ADMIN), user_controller_1.UserControllers.getAllUsers);
router.get("/me", (0, auth_1.default)(client_1.UserRole.SUPER_ADMIN, client_1.UserRole.ADMIN, client_1.UserRole.MEMBER), user_controller_1.UserControllers.getMyProfile);
router.post("/create-admin", (0, auth_1.default)(client_1.UserRole.SUPER_ADMIN, client_1.UserRole.ADMIN), fileUploader_1.fileUploader.upload.single("file"), (req, res, next) => {
    req.body = User_validation_1.UserValidations.createAdmin.parse(JSON.parse(req.body.data));
    return user_controller_1.UserControllers.createAdmin(req, res, next);
});
router.post("/create-member", fileUploader_1.fileUploader.upload.single("file"), (req, res, next) => {
    req.body = User_validation_1.UserValidations.createMember.parse(JSON.parse(req.body.data));
    return user_controller_1.UserControllers.createMember(req, res, next);
});
router.patch("/:id/status", (0, auth_1.default)(client_1.UserRole.SUPER_ADMIN, client_1.UserRole.ADMIN), (0, validateRequest_1.default)(User_validation_1.UserValidations.updateStatus), user_controller_1.UserControllers.changeProfileStatus);
router.patch("/update-my-profile", (0, auth_1.default)(client_1.UserRole.SUPER_ADMIN, client_1.UserRole.ADMIN, client_1.UserRole.MEMBER), fileUploader_1.fileUploader.upload.single("file"), (req, res, next) => {
    req.body = JSON.parse(req.body.data);
    return user_controller_1.UserControllers.updateMyProfile(req, res, next);
});
exports.UserRoutes = router;
