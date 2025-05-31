import { db } from "../libs/db";
import { ApiError } from "../utils/apiError";
import { asyncHandler } from "../utils/asyncHandler";
import { CookieOptions, Request, Response } from "express";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { env } from "../validators/env";
import { ApiResponse } from "../utils/apiResponse";
import { User, UserRole } from "@prisma/client";

import { clerkClient, getAuth } from '@clerk/express';

const generateToken = (user: User) => {
    return jwt.sign(
        {
            id: user.id
        }, env.JWT_SECRET!,
        {
            expiresIn: "7d"
        }
    )
}

const cookieOption: CookieOptions = {
    httpOnly: true,
    sameSite: "none",
    secure: env.NODE_ENV !== "development",
    maxAge: 1000 * 60 * 60 * 24 * 7
}

export const registerUser = asyncHandler(async (req: Request, res: Response) => {
    const { email, password, name } = req.body

    const user = await db.user.findFirst({
        where: {
            email
        }
    })

    if (user) throw new ApiError(400, "user already exists")

    const hashedPassword = await bcrypt.hash(password, 12)

    const newuser = await db.user.create({
        data: {
            email,
            password: hashedPassword,
            name,
            role: UserRole.USER
        }
    })

    const token = generateToken(newuser)

    res.cookie("tokens", token, cookieOption)

    res.status(201).json(new ApiResponse(201, "User is created", {
        user: {
            id: newuser.id,
            name: newuser.name,
            email: newuser.email,
            role: newuser.role,
            image: newuser.image
        }
    }))

})

export const getLogin = asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body

    const user = await db.user.findFirst({
        where: {
            email
        }
    })

    if (!user) throw new ApiError(401, "User not found")

    const isMatched = await bcrypt.compare(password, user.password || "")

    if (!isMatched) throw new ApiError(400, "Invalid Credential")

    const token = generateToken(user)

    res.cookie("tokens", token, cookieOption)

    res.status(200).json(new ApiResponse(200, "User logged in successfully", {
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            image: user.image
        }
    }))

})

export const getLogout = asyncHandler(async (req: Request, res: Response) => {

    res.clearCookie("tokens", cookieOption)
    res.status(200).json(new ApiResponse(200, "User logged out successfully"))
})

export const getUser = asyncHandler(async (req: Request, res: Response) => {

    const { userId } = getAuth(req)

    const clerkuser = await clerkClient.users.getUser(userId!)
    // console.log(clerkuser.id)

    let user = await db.user.findUnique({ where: { id: userId! } });

    if (!user) {
        user = await db.user.create({
            data: {
                id: clerkuser.id,
                email: clerkuser.emailAddresses[0]?.emailAddress,
                name: `${clerkuser.firstName || ""} ${clerkuser.lastName || ""}`.trim(),
                image: clerkuser.imageUrl,
                role: "USER",
                password: ""
            },
        });
    }

    res.status(200).json(new ApiResponse(200, "user is fetched", {
        ...user, role: user?.role
    }))
})

export const userProgress = asyncHandler(async (req: Request, res: Response) => {

    const { userId } = getAuth(req)

    const problemSolved = await db.problemSolved.findMany({
        where: {
            userId: userId!
        }, include: {
            problem: true
        }
    })

    const problems = await db.problem.findMany()

    const result = {
        easy: { solved: 0, total: 0 },
        medium: { solved: 0, total: 0 },
        hard: { solved: 0, total: 0 },
    };

    type Difficulty = 'easy' | 'medium' | 'hard';

    for (const prob of problems) {
        const difficulty = prob.difficulty.toLowerCase() as Difficulty;
        if (result[difficulty]) {
            result[difficulty].total += 1;
        }
    }

    for (const solved of problemSolved) {
        const difficulty = solved.problem.difficulty.toLowerCase() as Difficulty;
        if (result[difficulty]) {
            result[difficulty].solved += 1;
        }
    }

    res.status(200).json(new ApiResponse(200, "user is fetched", {
        progressData: {
            solved: problemSolved.length,
            total: problems.length,
            ...result
        }
    }))

})

