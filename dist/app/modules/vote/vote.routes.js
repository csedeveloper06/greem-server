"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VoteRoutes = void 0;
const express_1 = __importDefault(require("express"));
const vote_controller_1 = require("./vote.controller");
const router = express_1.default.Router();
router.post("/create-vote", vote_controller_1.VoteControllers.createVote);
router.get("/", vote_controller_1.VoteControllers.getAllVotes);
router.get("/:id", vote_controller_1.VoteControllers.getSingleVote);
router.delete("/:id", vote_controller_1.VoteControllers.deleteVote);
exports.VoteRoutes = router;
