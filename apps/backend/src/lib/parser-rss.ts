import Parser from "rss-parser";

import { Article } from "../db/schemas/article.schema";

import { FeedFullType, ItemType } from "../types/common.types";

type FeedType = { title: string; description: string };

const parser: Parser<FeedType, ItemType> = new Parser({
  customFields: {
    feed: ["title", "description"],
    item: [
      "title",
      "link",
      "pubDate",
      "author",
      "categories",
      "isoDate",
      "guid",
    ],
  },
});

export const rssParser = async () => {
  const lastArticle = await Article.findOne().sort({ isoDate: "desc" });

  const lastArticleDate = lastArticle?.isoDate;

  const feed: FeedFullType = await parser.parseURL(
    "https://www.radiosvoboda.org/api/zmqipebui_"
  );

  if (lastArticleDate) {
    const newFeeds: ItemType[] = [...feed.items].filter(({ isoDate }) => {
      new Date(isoDate).getTime() > lastArticleDate.getTime();
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
