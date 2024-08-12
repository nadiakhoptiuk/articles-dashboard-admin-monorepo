import express, { NextFunction, Request, Response } from "express";
import logger from "morgan";
import cors from "cors";

import { errorHandler } from "./middlewares/errorHandler";

import { articlesRouter } from "./routes/articles";

export const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(cors());

app.use("/articles", articlesRouter);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message });
});

app.use(errorHandler);
