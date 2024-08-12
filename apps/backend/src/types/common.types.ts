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

export interface AppError extends Error {
  status?: number;
}

export type UserCredentialsType = {
  email: string;
  password: string;
};

export type TokenType = {
  token: string;
};

export type WithId = {
  id: string;
};

export type UserType = UserCredentialsType & TokenType & WithId;
