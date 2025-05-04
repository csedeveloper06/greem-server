"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_route_1 = require("../modules/User/user.route");
const admin_routes_1 = require("../modules/Admin/admin.routes");
const auth_routes_1 = require("../modules/Auth/auth.routes");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: "/user",
        route: user_route_1.UserRoutes,
    },
    {
        path: "/admin",
        route: admin_routes_1.AdminRoutes,
    },
    {
        path: "/auth",
        route: auth_routes_1.AuthRoutes,
    },
];
moduleRoutes.forEach((moduleRoute) => router.use(moduleRoute.path, moduleRoute.route));
exports.default = router;
