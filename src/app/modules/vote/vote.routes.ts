import express from "express";
import { VoteControllers } from "./vote.controller";

const router = express.Router();

router.post("/create-vote", VoteControllers.createVote);

export const VoteRoutes = router;
