import express, { NextFunction, Request, Response } from "express";
import logger from "morgan";
import cors from "cors";

import { errorHandler } from "./middlewares/errorHandler";

import { articlesRouter } from "./routes/articles";
import { usersRouter } from "./routes/users";

export const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(cors());

app.use("/articles", articlesRouter);
app.use("/users", usersRouter);

app.use(errorHandler);
