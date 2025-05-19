import { ApiError } from "../utils/apiError"
import { NextFunction, Request, Response } from "express"
import * as yup from "yup"

export const validate = (schema: yup.Schema) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.validate(
                { ...req.body },
                { strict: true, abortEarly: true }
            )
            next()
        } catch (error) {
            if (error instanceof yup.ValidationError) {
                next(new ApiError(422, error.message));
            } else {
                next(error);
            }
        }
    }

}