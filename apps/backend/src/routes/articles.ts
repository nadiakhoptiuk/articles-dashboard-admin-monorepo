import express from "express";

import {
  createArticle,
  getAllArticles,
  updateArticle,deleteArticle
} from "../controllers/articles.controllers";
import { asyncErrorsHandler } from "../middlewares/asyncErrorsHandler";
import { validation } from "../middlewares/validation";
import {
  articleCreateSchemaValidation,
  articleUpdateSchemaValidation,
} from "../services/validation.schema";

export const articlesRouter = express.Router();

articlesRouter.get("/", asyncErrorsHandler(getAllArticles));

articlesRouter.post(
  "/",
  validation(articleCreateSchemaValidation),
  asyncErrorsHandler(createArticle)
);

articlesRouter.patch(
  "/:articleId",
  validation(articleUpdateSchemaValidation),
  asyncErrorsHandler(updateArticle)
);

articlesRouter.delete("/:articleId", asyncErrorsHandler(deleteArticle));
