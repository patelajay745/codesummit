import { requireAuth } from "@clerk/express";
import { runCode, submitCode } from "../controllers/execution";
import { isAuth } from "../middlewares/auth";
import { validate } from "../middlewares/validator";
import { executeCodeSchema, runCodeSchema } from "../validators/validationSchema";
import { Router } from "express";

export const router = Router()

router.post("/", requireAuth(), validate(executeCodeSchema), submitCode)
router.post("/run-code", requireAuth(), validate(runCodeSchema), runCode)