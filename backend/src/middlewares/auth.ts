
import { UserRole } from "@prisma/client";
import { db } from "../libs/db";
import { ApiError } from "../utils/apiError";
import { asyncHandler } from "../utils/asyncHandler";
import { env } from "../validators/env";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"
import { clerkClient, getAuth } from "@clerk/express";

type decodedType = {
    id: string,
}

export const isAuth = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {

    const token = req.cookies.tokens

    if (!token) throw new ApiError(403, "UnAuthorized Token")

    const decoded = jwt.verify(token, env.JWT_SECRET!) as decodedType

    const user = await db.user.findFirst({
        where: {
            id: decoded.id
        },
    })

    if (!user) throw new ApiError(404, "User not found")

    req.user = user

    next()

})

export const isAdmin = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {

    const { userId } = getAuth(req)

    const clerkuser = await clerkClient.users.getUser(userId!)

    let user = await db.user.findUnique({ where: { id: userId! } });

    req.user = user!

    if (user?.role !== UserRole.ADMIN) throw new ApiError(403, "UnAuthorized request")

    next()

})