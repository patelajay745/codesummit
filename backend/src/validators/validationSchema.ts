import * as yup from "yup"

export const newUserSchema = yup.object({
    name: yup.string().required("Name is required"),
    email: yup.string().email("Invalid Email").required("email is required"),
    password: yup.string().required("Password is required"),
});

export const loginSchema = yup.object({
    email: yup.string().email("Invalid Email").required("email is required"), password: yup.string().required("Password is required"),
})

export const Difficulty = {
    EASY: "EASY",
    MEDIUM: "MEDIUM",
    HARD: "HARD",
} as const;

export type Difficulty = (typeof Difficulty)[keyof typeof Difficulty];

export const createProblemSchema = yup.object({
    title: yup.string().required("Title is required"),
    company: yup.string().required("Company is required").optional(),
    description: yup.string().required("Description is required"),
    difficulty: yup.mixed<Difficulty>().oneOf(Object.values(Difficulty)),
    tags: yup.array().required("Tags is required"),
    examples: yup.object().required("examples is required"),
    constraints: yup.string().required("constraints is required"),
    testcases: yup.array().required("testcases is required"),
    codeSnippets: yup.object().required("codeSnippets is required"),
    referenceSolution: yup.object().required("referenceSolution is required")
})

export const executeCodeSchema = yup.object({
    source_code: yup.string().required("source_code is required"),
    language_id: yup.number().required("language_id is required"),
    stdin: yup.array().required("stdin is required"),
    expected_outputs: yup.array().required("expected_outputs is required"),
    problemId: yup.string().required("Problem Id is required")
})

export const runCodeSchema = yup.object({
    source_code: yup.string().required("source_code is required"),
    language_id: yup.number().required("language_id is required"),
    stdin: yup.array().required("stdin is required"),
    expected_outputs: yup.array().required("expected_outputs is required")
})

export const createPlaylistSchema = yup.object({
    name: yup.string().required("name is required"),
    description: yup.string().required("description is required"),
})

export const updatePlaylistSchema = yup.object({
    name: yup.string().required("name is required"),
    description: yup.string().required("description is required"),
}).test(
    'at-least-one',
    'Either name or description must be provided',
    (value) => {
        return !!(value?.name || value?.description);
    }
);