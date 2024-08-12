import { Request, Response, NextFunction } from "express";
import {
  getAllArticlesUtility,
  createArticleUtility,
  updateArticleUtility,
  deleteArticleUtility,
} from "../services/articles.services";

export const getAllArticles = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const articles = await getAllArticlesUtility();

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
