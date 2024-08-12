import { Conflict, NotFound } from "http-errors";

import { Article } from "../db/schemas/article.schema";

import { ArticleItemType } from "../types/common.types";

export const getAllArticlesUtility = async () => {
  const allArticles = await Article.find();

  if (!allArticles) {
    throw new NotFound("There are no one day in the database");
  }

  return allArticles;
};

export const createArticleUtility = async (article: ArticleItemType) => {
  const isExistedArticle = await Article.findOne({ link: article.link });

  if (isExistedArticle) {
    throw new Conflict("The article with such link is already exist");
  }

  return await Article.create(article);
};

export const updateArticleUtility = async (
  articleId: string,
  articleData: ArticleItemType
) => {
  const updatedArticle = await Article.findByIdAndUpdate(
    articleId,
    articleData,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!updatedArticle) {
    throw new NotFound(`The article with id "${articleId}" does not exist`);
  }

  return updatedArticle;
};

export const deleteArticleUtility = async (articleId: string) => {
  const deletedArticle = await Article.findByIdAndDelete(articleId);

  if (!deletedArticle) {
    throw new NotFound(`The article with id "${articleId}" does not exist`);
  }

  return deletedArticle;
};
