import { NextFunction, Request, Response } from "express";

import {
  createUser,
  loginUser,
  logOutUser,
} from "../services/users/users.services";

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

export const logIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const newUser = await loginUser(req.body);

  return res.status(201).json({
    status: "success",
    userData: { id: newUser?._id, email: newUser?.email },
  });
};

export const logOut = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await logOutUser(req.body._id);

  return res
    .status(204)
    .json({
      status: "success",
    })
    .send({
      message: `The user has successfully logged out`,
    });
};
