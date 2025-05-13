import express from "express";
import { VoteControllers } from "./vote.controller";

const router = express.Router();

router.post("/create-vote", VoteControllers.createVote);

router.get("/", VoteControllers.getAllVotes);

router.get("/:id", VoteControllers.getSingleVote);

router.delete("/:id", VoteControllers.deleteVote);

export const VoteRoutes = router;
