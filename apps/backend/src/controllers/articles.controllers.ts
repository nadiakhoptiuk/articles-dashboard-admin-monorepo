import { Request, Response, NextFunction } from "express";
import {
  getAllArticlesData,
  createArticleService,
} from "../services/articles.services";

export const getAllArticles = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const articles = await getAllArticlesData();

  res.status(200).send({ data: articles });
};

export const createArticle = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await createArticleService(req.body);

  res
    .status(201)
    .send({ message: "The article has been successfully created" });
};
