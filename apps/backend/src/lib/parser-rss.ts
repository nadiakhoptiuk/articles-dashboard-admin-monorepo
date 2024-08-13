import Parser from "rss-parser";

import { Article } from "../db/schemas/article.schema";

import {
  FeedFullType,
  ArticleItemType,
  ArticleItemFullType,
} from "../types/common.types";

type FeedType = { title: string; description: string };

const parser: Parser<FeedType, ArticleItemFullType> = new Parser({
  customFields: {
    feed: ["title", "description"],
    item: [
      "title",
      "link",
      "pubDate",
      "author",
      "categories",
      "isoDate",
      "enclosure",
      "content",
    ],
  },
});

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

    newFeeds.forEach((item) => {
      const { enclosure, ...props } = item;

      Article.create({ url: item.enclosure.url, ...props });
    });
  } else {
    feed.items.forEach((item) => {
      const { enclosure, ...props } = item;

      Article.create({ url: item.enclosure.url, ...props });
    });
  }
};
