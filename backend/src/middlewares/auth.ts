
import { UserRole } from "@prisma/client";
import { db } from "../libs/db";
import { ApiError } from "../utils/apiError";
import { asyncHandler } from "../utils/asyncHandler";
import { env } from "../validators/env";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"

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

    if (req.user?.role !== UserRole.ADMIN) throw new ApiError(403, "UnAuthorized request")

    next()

})