"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IdeaRoutes = void 0;
const client_1 = require("@prisma/client");
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const fileUploader_1 = require("../../../helpers/fileUploader");
const idea_validation_1 = require("./idea.validation");
const idea_controller_1 = require("./idea.controller");
const router = express_1.default.Router();
router.get("/", idea_controller_1.IdeaControllers.getAllIdeas);
router.get("/:id", idea_controller_1.IdeaControllers.getSingleIdea);
router.post("/create-idea", (0, auth_1.default)(client_1.UserRole.SUPER_ADMIN, client_1.UserRole.ADMIN, client_1.UserRole.MEMBER), fileUploader_1.fileUploader.upload.single("file"), (req, res, next) => {
    const ideaData = JSON.parse(req.body.data);
    req.body = idea_validation_1.IdeaValidations.createIdea.parse(ideaData);
    return idea_controller_1.IdeaControllers.createIdea(req, res, next);
});
router.patch("/:id", (0, auth_1.default)(client_1.UserRole.SUPER_ADMIN, client_1.UserRole.ADMIN, client_1.UserRole.MEMBER), fileUploader_1.fileUploader.upload.single("file"), (req, res, next) => {
    req.body = JSON.parse(req.body.data);
    return idea_controller_1.IdeaControllers.updateIdea(req, res, next);
});
router.delete("/:id", (0, auth_1.default)(client_1.UserRole.SUPER_ADMIN, client_1.UserRole.ADMIN), idea_controller_1.IdeaControllers.deleteIdea);
router.delete("/soft/:id", (0, auth_1.default)(client_1.UserRole.SUPER_ADMIN, client_1.UserRole.ADMIN), idea_controller_1.IdeaControllers.softDeleteIdea);
exports.IdeaRoutes = router;
