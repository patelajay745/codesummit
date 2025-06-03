import { db } from "../libs/db";
import { ApiError } from "../utils/apiError";
import { asyncHandler } from "../utils/asyncHandler";
import { CookieOptions, Request, Response } from "express";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { env } from "../validators/env";
import { ApiResponse } from "../utils/apiResponse";
import { User, UserRole } from "@prisma/client";
import crypto from "crypto";

import { clerkClient, getAuth } from '@clerk/express';
import { ResendMailer } from "@/utils/mail";

async function EmailSend(token: string, email: string) {

    const link = `${env.CORS_ORIGIN}/verify/${token}`;
    const mail = new ResendMailer(email);

    const emailHTML = `
  <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: auto; background-color: #ffffff; padding: 24px; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.08);">
  <h2 style="color: #1a202c;">Welcome to CodeSummit 👋</h2>
  <p style="font-size: 16px; color: #2d3748; line-height: 1.5;">
    We're thrilled to have you join us! To get started, please verify your email address by clicking the button below.
  </p>
  <div style="text-align: center; margin: 24px 0;">
    <a href="${link}" style="background-color: #4f46e5; color: #ffffff; text-decoration: none; padding: 14px 24px; border-radius: 8px; font-weight: 600; display: inline-block;">
      Confirm Your Email
    </a>
  </div>
  <p style="font-size: 14px; color: #4a5568;">
    If the button doesn’t work, you can also copy and paste this URL into your browser:
  </p>
  <p style="font-size: 14px; word-break: break-word;">
    <a href="${link}" style="color: #4f46e5;">${link}</a>
  </p>
  <hr style="margin: 32px 0; border: none; border-top: 1px solid #e2e8f0;" />
  <p style="font-size: 12px; color: #718096;">
    If you didn’t create this account, you can safely ignore this email.
  </p>
</div>
`;

    await mail.sendMail({
        subject: "Verify Your Email – Action Required",
        html: emailHTML,
    });

}

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
    const emailToken = await crypto.randomBytes(18).toString("hex");

    const newuser = await db.user.create({
        data: {
            email,
            password: hashedPassword,
            name,
            role: UserRole.USER,
            verificationToken: emailToken,
            verify: false,
            verificationTokenExpiry: new Date(Date.now() + 1000 * 60 * 60),
        }
    })

    const token = generateToken(newuser)

    // res.cookie("tokens", token, cookieOption)

    res.status(201).json(new ApiResponse(201, "Please verify your email.", {
        user: {
            id: newuser.id,
            name: newuser.name,
            email: newuser.email,
            role: newuser.role,
            image: newuser.image
        }
    }))

    EmailSend(emailToken, email)

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

    if (user.verify) {
        res.cookie("tokens", token, cookieOption)
    }

    res.status(200).json(new ApiResponse(200, "User logged in successfully", {
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            verified: user.verify,
            image: user.image
        }
    }))

})

export const getLogout = asyncHandler(async (req: Request, res: Response) => {

    res.clearCookie("tokens", cookieOption)
    res.status(200).json(new ApiResponse(200, "User logged out successfully"))
})

export const getUser = asyncHandler(async (req: Request, res: Response) => {

    const userId = req.user?.id

    let user = await db.user.findUnique({
        where: { id: userId! },
        select: {
            id: true,
            name: true,
            email: true,
            image: true,
            role: true
        },
    });

    res.status(200).json(new ApiResponse(200, "user is fetched", {
        user
    }))
})

export const userProgress = asyncHandler(async (req: Request, res: Response) => {

    const userId = req.user?.id

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

export const sendEmail = asyncHandler(async (req: Request, res: Response) => {
    const { email } = req.body

    if (!email) throw new ApiError(400, "Email is required");

    const token = await crypto.randomBytes(18).toString("hex");

    const user = await db.user.findFirst({ where: { email } })

    if (!user) throw new ApiError(404, "User Not found")

    const updatedUser = await db.user.updateMany({
        where: {
            email: email
        },
        data: {
            verificationToken: token,
            verificationTokenExpiry: new Date(Date.now() + 1000 * 60 * 60),
        }
    })

    EmailSend(token, email)

    res.status(200).json(new ApiResponse(200, "Email sent. Please check inbox "))

})

export const verify = asyncHandler(async (req: Request, res: Response) => {

    const { token } = req.params

    const user = await db.user.findFirst({
        where: {
            verificationToken: token
        }
    })

    if (!user) throw new ApiError(401, "Invalid token")

    if (user.verify) throw new ApiError(401, "Already Verified")

    const updatedUser = await db.user.update({
        where: {
            id: user.id
        }, data: {
            verify: true
        }
    })

    res.status(200).json(new ApiResponse(200, "Verified Successfully"))
})
