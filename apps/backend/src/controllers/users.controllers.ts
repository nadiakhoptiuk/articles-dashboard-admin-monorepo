import { NextFunction, Request, Response } from "express";

import {
  createUser,
  loginUser,
  logOutUser,
} from "../services/users/users.services";
import { AuthorizedRequest } from "../types/common.types";

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
    userData: {
      id: newUser?._id,
      email: newUser?.email,
      token: newUser?.token,
    },
  });
};

export const logOut = async (
  req: AuthorizedRequest,
  res: Response,
  next: NextFunction
) => {
  if (req.user?._id) await logOutUser(req.user._id);

  return res
    .status(204)
    .json({
      status: "success",
    })
    .send({
      message: `The user has successfully logged out`,
    });
};
