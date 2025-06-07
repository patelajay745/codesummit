import { checkout, fullfillCheckout } from "@/controllers/purchase";
import { isAuth } from "@/middlewares/auth";
import { Router } from "express";

export const router = Router()

router.post("/", isAuth, checkout)

router.post("/fulfillCheckout/:id", isAuth, fullfillCheckout)