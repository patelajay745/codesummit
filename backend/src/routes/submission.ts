import { requireAuth } from "@clerk/express";
import { getAllSubmission, getAllTheSubmissionsForProblem, getStreakData, getSubmissionById, getSuccessRateForProblem } from "../controllers/submission";
import { isAuth } from "../middlewares/auth";
import { Router } from "express";

export const router = Router()

router.use(isAuth)

router.get("/", getAllSubmission)
router.get("/streak-calendar", getStreakData)
router.get("/:problemId", getSubmissionById)
router.get("/submission-count/:problemId", getAllTheSubmissionsForProblem)
router.get("/success-count/:problemId", getSuccessRateForProblem)