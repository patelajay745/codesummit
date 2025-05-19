import { getAllSubmission, getAllTheSubmissionsForProblem, getSubmissionById } from "../controllers/submission";
import { isAuth } from "../middlewares/auth";
import { Router } from "express";

export const router = Router()

router.use(isAuth)

router.get("/", getAllSubmission)
router.get("/:problemId", getSubmissionById)
router.get("/submission-count/:problemId", getAllTheSubmissionsForProblem)