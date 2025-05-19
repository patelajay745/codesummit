
import express from "express"

export const asyncHandler = (requestHandler: Function) => {
    return function (req: express.Request, res: express.Response, next: express.NextFunction
    ) {
        Promise.resolve(requestHandler(req, res, next))
            .catch((error) => { next(error) })
    }
}