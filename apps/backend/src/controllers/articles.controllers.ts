import { Request, Response, NextFunction } from "express";
import {
  updateArticleUtility,
  createArticleUtility,
  deleteArticleUtility,
  getAllArticlesUtility,
} from "../services/articles/articles.services";
import { QueryParams } from "../types/common.types";

export const getAllArticlesWithParams = async (
  req: Request<{}, {}, {}, QueryParams>,
  res: Response,
  next: NextFunction
) => {
  const categoriesParam = req.query.category;
  const pageParam = req.query.page;
  const sortParam = req.query.sort;

  const categories: string[] | undefined = Array.isArray(categoriesParam)
    ? categoriesParam
    : categoriesParam
      ? [categoriesParam]
      : undefined;
  const page = Number(pageParam) || 1;
  const sort = sortParam === "1" ? 1 : sortParam === "-1" ? -1 : -1;

  const articles = await getAllArticlesUtility(categories, sort, page);

  res.status(200).send({ data: articles });
};

export const createArticle = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await createArticleUtility(req.body);

  res
    .status(201)
    .send({ message: "The article has been successfully created" });
};

export const updateArticle = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const article = req.body;
  const { articleId } = req.params;

  const updatedArticle = await updateArticleUtility(articleId, article);

  res.status(200).send({
    message: `The article with id=${articleId} has been successfully updated`,
    data: updatedArticle,
  });
};

export const deleteArticle = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { articleId } = req.params;

  await deleteArticleUtility(articleId);

  res.status(200).send({
    message: `The article with id=${articleId} has been successfully deleted`,
  });
};
