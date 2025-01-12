import { Request, Response, NextFunction } from "express";
import { APIError } from "./api.error";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof APIError) {
    res.status(err.statusCode).json({
      message: err.message,
      statusCode: err.statusCode,
    });
    return;
  }

  console.error(err);
  res.status(500).json({
    message: "Internal Server Error",
    statusCode: 500,
  });
};
