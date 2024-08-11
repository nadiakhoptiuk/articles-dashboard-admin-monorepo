export type ItemType = {
  title: string;
  link: string;
  pubDate: string;
  author: string;
  categories: string[];
  isoDate: string;
  guid: string;
};

export type FeedFullType = {
  title: string;
  description: string;
  items: ItemType[];
};
