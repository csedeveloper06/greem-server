"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentRoutes = void 0;
const express_1 = __importDefault(require("express"));
const comment_controller_1 = require("./comment.controller");
const comment_validation_1 = require("./comment.validation");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const client_1 = require("@prisma/client");
const router = express_1.default.Router();
router.get("/", comment_controller_1.CommentControllers.getAllComments);
router.get("/:id", comment_controller_1.CommentControllers.getSingleComment);
router.post("/create-comment", (req, res, next) => {
    req.body = comment_validation_1.CommentValidations.createComment.parse(req.body);
    return comment_controller_1.CommentControllers.createComment(req, res, next);
});
router.patch("/:id", (0, auth_1.default)(client_1.UserRole.SUPER_ADMIN, client_1.UserRole.ADMIN, client_1.UserRole.MEMBER), (req, res, next) => {
    req.body = comment_validation_1.CommentValidations.updateComment.parse(req.body);
    return comment_controller_1.CommentControllers.updateComment(req, res, next);
});
router.delete("/:id", (0, auth_1.default)(client_1.UserRole.SUPER_ADMIN, client_1.UserRole.ADMIN), comment_controller_1.CommentControllers.deleteComment);
exports.CommentRoutes = router;
