import { createProblem, getAllProblem, getAproblem, updateProblem, deleteProblem, getSolvedProblem } from "../controllers/problem";
import { isAdmin, isAuth } from "../middlewares/auth";
import { validate } from "../middlewares/validator";
import { createProblemSchema } from "../validators/validationSchema";
import { Router } from "express";

import { requireAuth } from "@clerk/express";

export const router = Router()

router.use(requireAuth())

router.post("/", isAdmin, validate(createProblemSchema), createProblem)
router.get("/get-solved-problems", getSolvedProblem)
router.get("/", getAllProblem)
router.get("/:problemId", getAproblem)
router.patch("/:problemId", isAdmin, updateProblem)
router.delete("/:problemId", isAdmin, deleteProblem)