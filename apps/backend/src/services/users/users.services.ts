import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import { Conflict, Forbidden, Unauthorized } from "http-errors";

import { User } from "../../db/schemas/user.schema";
import { UserAtDBType, UserCredentialsType } from "../../types/common.types";

dotenv.config();
const saltRounds = 10;
const secret = process.env.JWT_SECRET;

async function passwordHash(password: string) {
  const salt = await bcrypt.genSalt(saltRounds);
  return await bcrypt.hash(password, salt);
}

const checkPassword = async (
  password: string,
  passwordHash: string
): Promise<boolean> => {
  return bcrypt.compare(password, passwordHash);
};

const generateToken = async (user: UserAtDBType): Promise<string> => {
  if (!secret) throw new Error("Missing JWT_SECRET enviroment");

  return jwt.sign({ sub: user._id }, secret);
};

export const createUser = async ({ email, password }: UserCredentialsType) => {
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new Conflict("User with such email is already exist");
  }

  return await User.create({
    password: await passwordHash(password),
    email,
  });
};

export const loginUser = async ({ email, password }: UserCredentialsType) => {
  const existingUser: UserAtDBType | null = await User.findOne({ email });

  if (!existingUser) {
    throw new Conflict("User with such email is not exist");
  }

  const isPasswordCorrect =
    existingUser?.password &&
    (await checkPassword(password, existingUser.password));

  if (!isPasswordCorrect) {
    throw new Forbidden("Password is wrong");
  }

  const token = await generateToken(existingUser);

  return await User.findOneAndUpdate(
    { email },
    { token: token },
    {
      new: true,
      runValidators: true,
    }
  );
};

export async function logOutUser(userId: string) {
  const existedUser = await User.findOneAndUpdate(
    { _id: userId },
    { token: null },
    { new: true, runValidators: true }
  );

  if (!existedUser) {
    throw new Unauthorized("Not authorized");
  }

  return existedUser;
}
