import { Request, Response, NextFunction, RequestHandler } from "express";

export const asyncErrorsHandler = (middleware: RequestHandler) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await middleware(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};
