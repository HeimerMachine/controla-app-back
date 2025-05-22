import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { ApiError } from "@helpers/apiError";

export const errorMiddleware: ErrorRequestHandler = (
  err: Error & ApiError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.status || StatusCodes.INTERNAL_SERVER_ERROR;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    status: "error",
    statusCode,
    message,
  });
  next(err);
};
