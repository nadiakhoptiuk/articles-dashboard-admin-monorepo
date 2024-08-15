import express from "express";

import {
  createArticle,
  updateArticle,
  deleteArticle,
  getAllArticlesWithParams,
} from "../controllers/articles.controllers";
import { asyncErrorsHandler } from "../middlewares/asyncErrorsHandler";
import { validation } from "../middlewares/validation";
import {
  articleCreateSchemaValidation,
  articleUpdateSchemaValidation,
} from "../services/articles/validation.schema";
import { authorize } from "../middlewares/authorize";

export const articlesRouter = express.Router();

// articlesRouter.get("/", asyncErrorsHandler(getAllArticles));
articlesRouter.get("/", asyncErrorsHandler(getAllArticlesWithParams));

articlesRouter.post(
  "/",
  authorize,
  validation(articleCreateSchemaValidation),
  asyncErrorsHandler(createArticle)
);

articlesRouter.patch(
  "/:articleId",
  authorize,
  validation(articleUpdateSchemaValidation),
  asyncErrorsHandler(updateArticle)
);

articlesRouter.delete(
  "/:articleId",
  authorize,
  asyncErrorsHandler(deleteArticle)
);
