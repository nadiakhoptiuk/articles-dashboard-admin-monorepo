import express from "express";

import { asyncErrorsHandler } from "../middlewares/asyncErrorsHandler";
import { logIn, logOut, register } from "../controllers/users.controllers";
import { validation } from "../middlewares/validation";
import { userSchemaValidate } from "../services/users/validation.schema";
import { authorize } from "../middlewares/authorize";

export const usersRouter = express.Router();

usersRouter.post(
  "/registration",
  validation(userSchemaValidate),
  asyncErrorsHandler(register)
);

usersRouter.post(
  "/login",
  validation(userSchemaValidate),
  asyncErrorsHandler(logIn)
);

usersRouter.post("/logout", authorize, asyncErrorsHandler(logOut));
