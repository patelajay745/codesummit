import * as yup from "yup"

const envSchema = yup.object({
    PORT: yup.string().optional(),
    DATABASE_URL: yup.string().min(1, { message: "DATABASE_URL is required" }),
    BASEURL: yup.string().min(1, { message: "Base is required" }),
    CORS_ORIGIN: yup.string().min(1, { message: "CORS_ORIGIN is required" }).optional(),
    NODE_ENV: yup.string().min(1, { message: "NODE_ENV is required" }).optional(),
    JWT_SECRET: yup.string().min(1, { message: "JWT_SECRET is required" }),
    JUDGE0_API_URL: yup.string().min(1, { message: "JUDGE0_API_URL is required" }),
    JUDGE0_AUTH: yup.string().min(1, { message: "JUDGE0_AUTH is required" }),
})

function createENV(env: NodeJS.ProcessEnv) {
    try {
        const validatedEnv = envSchema.validateSync(process.env, {
            abortEarly: false,
            stripUnknown: true,
        })
        return validatedEnv
    } catch (error) {
        if (error instanceof yup.ValidationError) {
            throw new Error(error.errors.join(", "))
        }
        throw error
    }
}

export const env = createENV(process.env)
