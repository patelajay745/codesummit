import { getAuth } from "@clerk/express";
import { db } from "../libs/db";
import { getLanguageName, poolBatchResults, Submissions, submitBatch } from "../libs/helper";
import { ApiError } from "../utils/apiError";
import { ApiResponse } from "../utils/apiResponse";
import { asyncHandler } from "../utils/asyncHandler";
import { Request, Response } from "express";

export const executeCode = asyncHandler(async (req: Request, res: Response) => {
    let { source_code, language_id, stdin, expected_outputs, problemId } = req.body

    const { userId } = getAuth(req)

    if (stdin.length === 0 || expected_outputs.length !== stdin.length) {
        throw new ApiError(400, "Invalid or missing test cases")
    }

    const submissions = stdin.map((input: string) => ({
        source_code,
        language_id: Number(language_id),
        stdin: input,
    })) as Submissions[]

    const submitResponse = await submitBatch(submissions)

    const tokens = submitResponse.map((res) => res.token)

    const results = await poolBatchResults(tokens)

    let allPassed = true

    const detailedResults = results.map((result, i) => {
        const stdout = result.stdout!.trim()
        const expected_output = expected_outputs[i]?.trim()

        const passed = stdout === expected_output

        if (!passed) allPassed = false

        return {
            testCase: i + 1,
            passed,
            stdout,
            expected: expected_output as string,
            stderr: result.stderr || null,
            compileOutput: result.compile_output || null,
            status: result.status.description,
            memory: result.memory ? `${result.memory} KB` : null,
            time: result.time ? `${result.memory} Seconds` : null,
            // submissionId: problemId
        }
    })

    const submission = await db.submission.create({
        data: {
            userId: userId!,
            problemId,
            sourceCode: source_code,
            language: getLanguageName(+language_id),
            stdin: stdin.join("\n"),
            stdout: JSON.stringify(detailedResults.map(r => r.stdout)),
            stderr: detailedResults.some(r => r.stderr) ? JSON.stringify(detailedResults.map(r => r.stderr)) : null,
            compileOutput: detailedResults.some(r => r.compileOutput) ? JSON.stringify(detailedResults.map(r => r.compileOutput)) : null,
            status: allPassed ? "Accepted" : "Wrong Answer",
            memory: detailedResults.some(r => r.memory) ? JSON.stringify(detailedResults.map(r => r.memory)) : null,
            time: detailedResults.some(r => r.time) ? JSON.stringify(detailedResults.map(r => r.time)) : null,
        }
    })

    if (allPassed) {
        await db.problemSolved.upsert({
            where: {
                userId_problemId: {
                    userId: userId!, problemId
                }
            },
            update: {},
            create: {
                userId: userId!,
                problemId,
            }
        })
    }

    const testcaseResults = detailedResults.map(result => ({
        ...result,
        submissionId: submission!.id,
        status: result.status ?? ""
    }))

    await db.testCaseResult.createMany({
        data: testcaseResults
    })

    const submissionWithTestCase = await db.submission.findUnique({
        where: {
            id: submission.id
        },
        include: {
            TestCaseResult: true
        }
    })

    if (!submissionWithTestCase) throw new ApiError(500, "Something went wrong")

    res.status(200).json(new ApiResponse(200, "Code is executed", submissionWithTestCase))
})