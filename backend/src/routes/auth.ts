import { getLogin, getLogout, getUser, registerUser } from "../controllers/auth";
import { limitter } from "../libs/rate-limiter";
import { isAuth } from "../middlewares/auth";
import { validate } from "../middlewares/validator";
import { loginSchema, newUserSchema } from "../validators/validationSchema";
import { Router } from "express";

import { ClerkExpressRequireAuth, ClerkExpressWithAuth } from '@clerk/clerk-sdk-node'
import { clerkMiddleware, requireAuth } from "@clerk/express";

export const router = Router()

const loginlimiter = limitter(5, 15)

router.post("/", loginlimiter, validate(newUserSchema), registerUser)
router.get("/", requireAuth(), getUser)
router.post("/login", validate(loginSchema), getLogin)
router.post("/logout", isAuth, getLogout)