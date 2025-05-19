import { ApiError } from "../utils/apiError";
import rateLimit from "express-rate-limit";

export const limitter = (limit: number, minute: number) => rateLimit({
    windowMs: minute * 60 * 1000,
    limit: limit,
    standardHeaders: "draft-8",
    legacyHeaders: false,
    message: new ApiError(429, "Too many request"),
});