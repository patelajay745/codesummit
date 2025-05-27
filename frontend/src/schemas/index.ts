
import { z } from "zod"

export const difficultyEnum = z.enum(["EASY", "MEDIUM", "HARD"]);
export type Difficulty = z.infer<typeof difficultyEnum>;

export const signUpSchema = z.object({
    email: z.string().email("Enter a valid email"),
    password: z.string().min(6, "password must be atleast of 6 characters"),
    name: z.string().min(3, "Name must be atleast 3 character"),
    confirm_password: z.string().min(3, "Password must be atleast of 6 character")
}).superRefine(({ confirm_password, password }, ctx) => {
    if (confirm_password !== password) {
        ctx.addIssue({
            code: "custom",
            message: "The passwords did not match",
            path: ['confirm_password']
        });
    }
})

export const signInSchema = z.object({
    email: z.string().email("Enter a valid email"),
    password: z.string().min(6, "password must be atleast of 6 characters"),
})

export const addProblemSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters"),
    description: z.string().min(10, "Description must be at least 10 characters"),
    tags: z.array(z.string()),
    difficulty: difficultyEnum,
    constraints: z.string().min(1, "Constraints are required"),
    hints: z.string().optional(),
    editorial: z.string().optional(),
    testcases: z
        .array(
            z.object({
                input: z.string().min(1, "Input is required"),
                output: z.string().min(1, "Output is required"),
            })
        )
        .min(1, "At least one test case is required"),
    examples: z.record(z.string(), z.object({
        input: z.string().min(1, "Input is required"),
        output: z.string().min(1, "Output is required"),
        explanation: z.string().min(1, "Explanation is required"),
    })),
    codeSnippets: z.record(z.string(), z.string()),
    referenceSolution: z.record(z.string(), z.string()),
});

export const createPlaylistSchema = z.object({
    name: z.string().min(1, "Name is required"),
    description: z.string().min(1, "Description is required"),
})