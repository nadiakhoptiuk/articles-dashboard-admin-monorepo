import Parser from "rss-parser";

import { Article } from "../db/schemas/article.schema";

import { FeedFullType, ArticleItemType } from "../types/common.types";

type FeedType = { title: string; description: string };

const parser: Parser<FeedType, ArticleItemType> = new Parser({
  customFields: {
    feed: ["title", "description"],
    item: ["title", "link", "pubDate", "author", "categories", "isoDate"],
  },
});

export const rssParser = async () => {
  const lastArticle = await Article.findOne().sort({ isoDate: "desc" });
  const lastArticleDate = lastArticle?.isoDate;

  const feed: FeedFullType = await parser.parseURL(
    "https://www.radiosvoboda.org/api/zipkqejjki"
  );

  if (lastArticleDate) {
    const newFeeds: ArticleItemType[] = feed.items.filter((feed) => {
      if (new Date(feed.isoDate).getTime() > lastArticleDate.getTime())
        return feed;
    });

    newFeeds.forEach((item) => {
      Article.create(item);
    });
  } else {
    feed.items.forEach((item) => {
      Article.create(item);
    });
  }
};
