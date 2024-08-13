import { NextFunction, Response } from "express";
import { Unauthorized } from "http-errors";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import { User } from "../db/schemas/user.schema";
import { IUser, AuthorizedRequest } from "../types/common.types";

dotenv.config();
const secret = process.env.JWT_SECRET;

export const authorize = async (
  req: AuthorizedRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization || "";

  const token = authHeader.replace("Bearer ", "");
  if (!secret) throw new Error("Missing JWT_SECRET enviroment");

  try {
    const payload = jwt.verify(token, secret);

    const existingUser: IUser | null = await User.findOne({
      _id: payload.sub,
      token: token,
    });

    if (!existingUser) {
      throw new Unauthorized("Unauthorized");
    }

    req.user = existingUser;
  } catch (error) {
    return next(new Unauthorized("Unauthorized"));
  }
  next();
};
