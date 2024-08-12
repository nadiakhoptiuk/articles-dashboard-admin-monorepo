import express from "express";

import { asyncErrorsHandler } from "../middlewares/asyncErrorsHandler";
import { register } from "../controllers/users.controllers";
import { validation } from "../middlewares/validation";
import { createUserSchema } from "../services/users/validation.schema";

export const usersRouter = express.Router();

usersRouter.post(
  "/register",
  validation(createUserSchema),
  asyncErrorsHandler(register)
);

// usersRouter.post(
//   "/login",
//   validate(logInUserSchema),
//   asyncErrorsHandler(logIn)
// );

// usersRouter.post("/logout", authorize, asyncErrorsHandler(logOut));
