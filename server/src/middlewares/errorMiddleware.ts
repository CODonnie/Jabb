import { NextFunction, Request, Response } from "express";

const notFound = (req: Request, res: Response, next: NextFunction) => {
    const error = new Error(`not found - ${req.originalUrl}`);
    res.status(404);
    next(error);
};

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    let message = err.message;

    if(err.name === "CastError" && err.kind === "ObjectId"){
        statusCode = 404;
        message = "resources not found";
    } else if  (err.name === "ValidationError") {
        statusCode = 500;
        message = "Internal Server Error";
    }

    res.status(statusCode).json({
        message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    });
}

export { notFound, errorHandler};
