
import { UserRole } from "@prisma/client";
import { db } from "../libs/db";
import { ApiError } from "../utils/apiError";
import { asyncHandler } from "../utils/asyncHandler";
import { env } from "../validators/env";
import { NextFunction, Request, Response } from "express";

import { clerkClient, getAuth } from "@clerk/express";
import Cookies from 'cookies'
import jwt from 'jsonwebtoken'

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

export const clerkAuth = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {

    const publicKey = process.env.CLERK_SECRET_KEY

    if (!publicKey) return

    const cookies = new Cookies(req, res)
    const tokenSameOrigin = cookies.get('__session')
    const tokenCrossOrigin = req.headers.authorization

    if (!tokenSameOrigin && !tokenCrossOrigin) {
        res.status(401).json({ error: 'Not signed in' })
        return
    }

    try {
        let decoded

        const permittedOrigins = ['http://localhost:3000', 'https://example.com']

        if (tokenSameOrigin) {
            decoded = jwt.verify(tokenSameOrigin, publicKey, { algorithms: ['RS256'] }) as any
        } else {
            decoded = jwt.verify(tokenCrossOrigin!, publicKey, { algorithms: ['RS256'] }) as any
        }

        const currentTime = Math.floor(Date.now() / 1000)
        if (decoded!.exp < currentTime || decoded!.nbf > currentTime) {
            throw new Error('Token is expired or not yet valid')
        }

        if (decoded.azp && !permittedOrigins.includes(decoded.azp)) {
            throw new Error("Invalid 'azp' claim")
        }

        next()
    } catch (error) {
        console.log(error)
        throw new ApiError(401, "Jwt Expired")

    }

})

export const myAuth = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {

    // console.log(req.auth())

    next()

})

