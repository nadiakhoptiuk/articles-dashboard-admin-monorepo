import { NextFunction, Request, Response } from "express";

import { createUser } from "../services/users/users.services";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const newUser = await createUser(req.body);

  return res.status(201).json({
    status: "success",
    userData: { id: newUser._id, email: newUser.email },
  });
};
