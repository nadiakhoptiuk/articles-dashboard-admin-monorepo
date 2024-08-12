import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import { Conflict } from "http-errors";

import { User } from "../../db/schemas/user.schema";
import { UserCredentialsType, UserType } from "../../types/common.types";

dotenv.config();
const saltRounds = 10;
const secret = process.env.JWT_SECRET;

async function passwordHash(password: string) {
  const salt = await bcrypt.genSalt(saltRounds);
  return await bcrypt.hash(password, salt);
}

async function checkPassword(password: string, passwordHash: string) {
  return bcrypt.compare(password, passwordHash);
}

// async function generateToken(user: UserType) {
//   return jwt.sign({ sub: user._id }, secret);
// }

export const createUser = async ({ email, password }: UserCredentialsType) => {
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new Conflict("Email in use");
  }

  return await User.create({
    password: await passwordHash(password),
    email,
  });
};
