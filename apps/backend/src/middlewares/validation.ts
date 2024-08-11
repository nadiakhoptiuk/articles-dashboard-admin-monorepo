import { Request, Response, NextFunction } from "express";
import { Schema } from 'joi';

export const validation = (schema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const result = schema.validate(req.body);

    if (result.error) {
      const errorField = result.error.details[0].context.label;

      console.log(result.error.details[0].context);

      return res
        .status(400)
        .json({ message: `missing value or error at "${errorField}" field` });
    }

    req.body = result.value;
    next();
  };
};
