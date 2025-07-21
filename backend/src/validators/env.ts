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
    RESEND_API_KEY: yup.string().min(1, { message: "RESEND_API_KEY is required" }),
    STRIPE_PUBLIC_KEY: yup.string().min(1, { message: "STRIPE_PUBLIC_KEY is required" }),
    STRIPE_SECRET_KEY: yup.string().min(1, { message: "STRIPE_SECRET_KEY is required" }),
    REDIS_URL: yup.string().min(1, { message: "REDIS_URL is required" }),
    REDIS_USERNAME: yup.string().min(1, { message: "REDIS_USERNAME is required" }),
    REDIS_PASSWORD: yup.string().min(1, { message: "REDIS_PASSWORD is required" }),
    REDIS_PORT: yup.number().min(1, { message: "REDIS_PORT is required" }),
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
