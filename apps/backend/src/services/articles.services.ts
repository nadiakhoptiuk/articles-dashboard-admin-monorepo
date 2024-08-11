import { Conflict, NotFound } from "http-errors";

import { Article } from "../db/schemas/article.schema";

import { ArticleItemType } from "../types/common.types";

export const getAllArticlesData = async () => {
  const allArticles = await Article.find();

  if (!allArticles) {
    throw new NotFound("There are no one day in the database");
  }

  return allArticles;
};

export const createArticleService = async (article: ArticleItemType) => {
  const isExistedArticle = await Article.findOne({ link: article.link });

  if (isExistedArticle) {
    throw new Conflict("The article with such link is already exist");
  }

  return await Article.create(article);
};
