export type ArticleItemType = {
  title: string;
  link: string;
  pubDate: string;
  author: string;
  categories: string[];
  isoDate: string;
};

export type FeedFullType = {
  title: string;
  description: string;
  items: ArticleItemType[];
};
