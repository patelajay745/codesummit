import { db } from "../libs/db";
import { ApiError } from "../utils/apiError";
import { ApiResponse } from "../utils/apiResponse";
import { asyncHandler } from "../utils/asyncHandler";
import { Response, Request } from "express";

export const getAllSubmission = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user!.id

    const submission = await db.submission.findMany({
        where: {
            userId
        }, include: {
            TestCaseResult: true
        }
    })

    if (!submission) throw new ApiError(404, "No submission found")

    res.status(200).json(new ApiResponse(200, "All Submissions are fetched", submission))
})

export const getSubmissionById = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user!.id
    const { problemId } = req.params

    const submission = await db.submission.findMany({
        where: {
            userId, problemId: problemId
        }, include: {
            TestCaseResult: true
        }, orderBy: {
            createAt: 'desc',
        }
    })

    if (!submission) throw new ApiError(404, "No submission found")

    res.status(200).json(new ApiResponse(200, "Submission is fetched", submission))
})

export const getAllTheSubmissionsForProblem = asyncHandler(async (req: Request, res: Response) => {

    const { problemId } = req.params
    const userId = req.user!.id

    const submission = await db.submission.count({
        where: {
            userId, problemId: problemId
        }
    })

    if (!submission) throw new ApiError(404, "No submission found")

    res.status(200).json(new ApiResponse(200, "Submission is fetched", submission))
})