
import { date } from "yup";
import { db } from "../libs/db";
import { ApiError } from "../utils/apiError";
import { ApiResponse } from "../utils/apiResponse";
import { asyncHandler } from "../utils/asyncHandler";
import { Response, Request } from "express";
import { transformSubmissionData } from "@/libs/helper";

export const getAllSubmission = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user?.id

    const submission = await db.submission.findMany({
        where: {
            userId: userId!
        }, include: {
            TestCaseResult: true
        }
    })

    if (!submission) throw new ApiError(404, "No submission found")

    res.status(200).json(new ApiResponse(200, "All Submissions are fetched", submission))
})

export const getSubmissionById = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user?.id
    const { problemId } = req.params

    const submission = await db.submission.findMany({
        where: {
            userId: userId!, problemId: problemId
        }, include: {
            TestCaseResult: true
        }, orderBy: {
            createAt: 'desc',
        }
    })

    if (!submission) throw new ApiError(404, "No submission found")

    res.status(200).json(new ApiResponse(200, "Submission is fetched", submission))
})

export const getAllTheSubmissionsForProblem = (async (req: Request, res: Response) => {

    const { problemId } = req.params
    const userId = req.user!.id

    const submission = await db.submission.count({
        where: {
            userId: userId!, problemId: problemId
        }
    })

    res.status(200).json(new ApiResponse(200, "Submission is fetched", { count: submission }))
})

export const getSuccessRateForProblem = asyncHandler(async (req: Request, res: Response) => {

    const { problemId } = req.params

    const submission = await db.submission.findMany({
        where: {
            problemId: problemId
        }
    })

    if (!submission) throw new ApiError(404, "No submission found")

    const successSubmission = submission.filter(sub => sub.status === "Accepted")

    const percentage = (successSubmission.length * 100) / (submission.length)

    res.status(200).json(new ApiResponse(200, "Submission is fetched", percentage.toFixed(2)))
})

export const getStreakData = asyncHandler(async (req: Request, res: Response) => {

    const submission = await db.submission.findMany({
        where: {
            userId: req.user?.id
        }
    })

    console.log("submission", submission)
    const dailySummary = transformSubmissionData(submission);
    console.log(dailySummary);
    console.log("submission", dailySummary)

    if (!submission) throw new ApiError(404, "No submission found")

    res.status(200).json(new ApiResponse(200, "Submission is fetched", dailySummary))
})