import { getLogin, getLogout, getUser, registerUser, sendEmail, userProgress, verify, } from "../controllers/auth";
import { limitter } from "../libs/rate-limiter";
import { isAuth } from "../middlewares/auth";
import { validate } from "../middlewares/validator";
import { loginSchema, newUserSchema } from "../validators/validationSchema";
import { Router } from "express";

import { requireAuth } from "@clerk/express";

export const router = Router()

const loginlimiter = limitter(5, 15)
const emaillimiter = limitter(2, 15)

router.post("/", loginlimiter, validate(newUserSchema), registerUser)
router.post("/login", validate(loginSchema), getLogin)
router.post("/logout", isAuth, getLogout)

router.get("/", isAuth, getUser)
router.post("/email-send", emaillimiter, sendEmail)
router.get("/verify/:token", verify)
router.get("/user-progress", isAuth, userProgress)