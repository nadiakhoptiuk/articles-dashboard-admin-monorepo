import { Conflict, NotFound } from "http-errors";

import { Article } from "../../db/schemas/article.schema";
import { serializeArticle } from "./serializeArticle";

import {
  ArticleItemDBFullType,
  ArticleItemType,
} from "../../types/common.types";

export const getAllArticlesUtility = async (
  categories: string[] | undefined,
  sort: 1 | -1,
  page: number
) => {
  let allArticles;
  let count;

  const onlyPubDateSort =
    (!categories || categories?.length < 0) && sort && page;

  const categoriesAndPubDateSort =
    categories && categories?.length > 0 && sort && page;

  if (categoriesAndPubDateSort) {
    allArticles = await Article.find({ categories: { $all: categories } })
      .sort({
        pubDate: sort,
      })
      .limit(10)
      .skip(10 * (page - 1));

    count = await Article.countDocuments({
      categories: { $all: categories },
    });
  }

  if (onlyPubDateSort) {
    allArticles = await Article.find()
      .sort({
        pubDate: sort,
      })
      .limit(10)
      .skip(10 * (page - 1));

    count = await Article.countDocuments();
  }

  if (!allArticles) {
    return { articles: [], count: 0 };
  }

  const serializedArticles = allArticles.map((article) =>
    serializeArticle(article as ArticleItemDBFullType)
  );

  return { articles: serializedArticles, count: count };
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
  const updatedArticle: ArticleItemDBFullType | null =
    await Article.findByIdAndUpdate(articleId, articleData, {
      new: true,
      runValidators: true,
    });

  if (!updatedArticle) {
    throw new NotFound(`The article with id "${articleId}" does not exist`);
  }

  return serializeArticle(updatedArticle);
};

export const deleteArticleUtility = async (articleId: string) => {
  const deletedArticle = await Article.findByIdAndDelete(articleId);

  if (!deletedArticle) {
    throw new NotFound(`The article with id "${articleId}" does not exist`);
  }

  return deletedArticle;
};
