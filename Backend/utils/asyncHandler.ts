import type { Request, Response, NextFunction } from 'express'

interface AsyncRequestHandler {
    (req: Request, res: Response, next: NextFunction): Promise<unknown> | unknown
}

interface AsyncMiddleware {
    (req: Request, res: Response, next: NextFunction): void
}

const asyncHandler = (requestHandler: AsyncRequestHandler): AsyncMiddleware => {
    return (req: Request, res: Response, next: NextFunction): void => {
        Promise.resolve(requestHandler(req, res, next)).catch((err: unknown) => next(err))
    }
}

export { asyncHandler }




// const asyncHandler = () => {}
// const asyncHandler = (func) => () => {}
// const asyncHandler = (func) => async () => {}


// const asyncHandler = (fn) => async (req, res, next) => {
//     try {
//         await fn(req, res, next)
//     } catch (error) {
//         res.status(err.code || 500).json({
//             success: false,
//             message: err.message
//         })
//     }
// }