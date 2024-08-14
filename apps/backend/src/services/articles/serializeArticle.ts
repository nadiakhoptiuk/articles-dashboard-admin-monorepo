import { ArticleItemDBFullType } from "../../types/common.types";

export const serializeArticle = (article: ArticleItemDBFullType) => {
  return {
    title: article.title,
    content: article.content,
    _id: article._id,
    imageUrl: article.imageUrl,
    categories: article.categories,
    link: article.link,
    pubDate: article.pubDate,
    isoDate: article.isoDate,
  };
};
