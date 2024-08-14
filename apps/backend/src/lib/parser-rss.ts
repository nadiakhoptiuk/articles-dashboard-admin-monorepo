import Parser from "rss-parser";

import { Article } from "../db/schemas/article.schema";

import { FeedFullType, ArticleItemFullType } from "../types/common.types";

type FeedType = { title: string; description: string };

const parser: Parser<FeedType, ArticleItemFullType> = new Parser({
  customFields: {
    feed: ["title", "description"],
    item: [
      "title",
      "link",
      "pubDate",
      "categories",
      "isoDate",
      "enclosure",
      "content",
    ],
  },
});

const categoryFormat = (array: string[]) => {
  return array.reduce((acc: any[], category: string) => {
    if (category.trim() !== "Новини") {
      return [...acc, category.replace("Новини | ", "")];
    }

    return acc;
  }, []);
};

const feedFormatAndSaveToDB = (feeds: ArticleItemFullType[]) => {
  feeds.forEach((item) => {
    const { enclosure, categories, ...props } = item;

    const newCategories = categoryFormat(categories);

    Article.create({
      imageUrl: item.enclosure.url,
      categories: newCategories,
      ...props,
    });
  });
};

export const rssParser = async () => {
  const lastArticle = await Article.findOne().sort({ isoDate: "desc" });
  const lastArticleDate = lastArticle?.isoDate;

  const feed: FeedFullType = await parser.parseURL(
    "https://www.radiosvoboda.org/api/zipkqejjki"
  );

  if (lastArticleDate) {
    const newFeeds: ArticleItemFullType[] = feed.items.filter((feed) => {
      if (new Date(feed.isoDate).getTime() > lastArticleDate.getTime())
        return feed;
    });

    feedFormatAndSaveToDB(newFeeds);
  } else {
    feedFormatAndSaveToDB(feed.items);
  }
};
