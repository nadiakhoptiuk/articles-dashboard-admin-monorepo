import express from "express";

import {
  createArticle,
  getAllArticles,
} from "../controllers/articles.controllers";
import { asyncErrorsHandler } from "../middlewares/asyncErrorsHandler";
import { validation } from "../middlewares/validation";
import { createArticleSchema } from "../services/validation.schema";

export const router = express.Router();

router.get("/", asyncErrorsHandler(getAllArticles));

router.post(
  "/",
  validation(createArticleSchema),
  asyncErrorsHandler(createArticle)
);

// router.get("/:day", asyncErrorsHandler(getAllDataForDay));
