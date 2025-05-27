import { db } from "../libs/db";
import { getJudge0LanguageId, poolBatchResults, Submissions, submitBatch, TestcasesTypes } from "../libs/helper";
import { ApiError } from "../utils/apiError";
import { ApiResponse } from "../utils/apiResponse";
import { asyncHandler } from "../utils/asyncHandler";
import { Request, Response } from "express";

const checkRefrenceSolution = async (referenceSolution: Object, testcases: TestcasesTypes[]) => {
    for (const [language, solutionCode] of Object.entries(referenceSolution)) {
        const languageId = getJudge0LanguageId(language)

        if (!languageId) throw new ApiError(400, `${language} Language is not supported`)

        const submissions = testcases.map(({ input, output }) => {
            return {
                source_code: solutionCode,
                language_id: languageId,
                stdin: input,
                expected_output: output
            };
        }) as Submissions[];

        const submissionResults = await submitBatch(submissions)

        const tokens = submissionResults.map((res) => res.token)

        const results = await poolBatchResults(tokens)

        for (let i = 0; i < results.length; i++) {
            const result = results[i]

            if (result.status.id !== 3) {
                throw new ApiError(400, `Testcase ${i + 1} failed for language ${language}`)
            }
        }

    }
}

export const createProblem = asyncHandler(async (req: Request, res: Response) => {

    const { title, description, difficulty, tags, examples, constraints, testcases, codeSnippets, referenceSolution, company } = req.body

    await checkRefrenceSolution(referenceSolution, testcases)

    const newProblem = await db.problem.create({
        data: {
            title, description, difficulty, tags, examples, constraints, company, testcases, codeSnippets, referenceSolution, userId: req.user!.id
        }
    })

    return res.status(201).json(new ApiResponse(201, "New problem is created", newProblem))

})

export const getAllProblem = asyncHandler(async (req: Request, res: Response) => {
    const problems = await db.problem.findMany({
        include: {
            ProblemSolved: {
                where: {
                    userId: req.user!.id,
                },
            },
        },
        orderBy: { createdAt: 'desc', }
    })

    if (!problems) throw new ApiError(404, "No problem found")

    res.status(200).json(new ApiResponse(200, "All problems are fetched", problems))
})

export const getAproblem = asyncHandler(async (req: Request, res: Response) => {
    const { problemId } = req.params

    const problem = await db.problem.findUnique({
        where: {
            id: problemId
        }
    })

    if (!problem) throw new ApiError(404, "No problem found")

    res.status(200).json(new ApiResponse(200, "Problem is fetched", problem))
})

export const updateProblem = asyncHandler(async (req: Request, res: Response) => {
    const { problemId } = req.params

    const { title, description, difficulty, tags, examples, constraints, testcases, codeSnippets, referenceSolution } = req.body

    const problem = await db.problem.findFirst({
        where: {
            id: problemId
        }
    })

    if (!problem) throw new ApiError(200, "No problem found")

    if (referenceSolution || testcases) {
        if (!referenceSolution || !testcases) {
            throw new ApiError(400, "Please provide both referenceSolution and testcases");
        }

        await checkRefrenceSolution(referenceSolution, testcases);
    }

    const updatedProblem = await db.problem.updateManyAndReturn({
        where: {
            id: problemId
        },
        data: {
            title: title || undefined,
            description: description || undefined,
            difficulty: difficulty || undefined,
            tags: tags || undefined,
            examples: examples || undefined,
            constraints: constraints || undefined,
            testcases: testcases || undefined,
            codeSnippets: codeSnippets || undefined,
            referenceSolution: referenceSolution || undefined

        }
    })

    if (!updatedProblem) throw new ApiError(500, "Something went wrong")

    res.status(200).json(new ApiResponse(200, "Problem has been updated", updatedProblem))

})

export const deleteProblem = asyncHandler(async (req: Request, res: Response) => {
    const { problemId } = req.params

    const deletedProblem = await db.problem.delete({
        where: {
            id: problemId
        }
    })

    if (!deletedProblem) throw new ApiError(404, "No problem found")

    res.status(200).json(new ApiResponse(200, "Problem is deleted"))
})

export const getSolvedProblem = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user!.id

    const problems = await db.problemSolved.findMany({
        where: {
            userId
        }, include: {
            problem: true,
        }
    })

    if (!problems) throw new ApiError(404, "No solved problem found")

    res.status(200).json(new ApiResponse(200, "All solved problem fetched", problems))
})

