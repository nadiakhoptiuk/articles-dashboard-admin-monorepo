import { Request } from "express";

export type ArticleItemFullType = {
  title: string;
  link: string;
  pubDate: string;
  author: string;
  categories: string[];
  isoDate: string;
  enclosure: {
    url: string;
    type: string;
    length: string;
  };
  content: string;
};

export type ArticleItemType = {
  title: string;
  link: string;
  pubDate: string;
  author: string;
  categories: string[];
  isoDate: string;
  imageUrl: string;
  content: string;
};

export type FeedFullType = {
  title: string;
  description: string;
  items: ArticleItemFullType[];
};

export interface AppError extends Error {
  status?: number;
}

export type UserCredentialsType = {
  email: string;
  password: string;
};

export type TokenType = {
  token: string | null;
};

export type WithId = {
  id: string;
};

export type WithIdFromDB = {
  _id: string;
};

export type UserType = UserCredentialsType & TokenType & WithId;
export type UserAtDBType = UserCredentialsType & TokenType & WithIdFromDB;

export interface IUser extends Document {
  email: string;
  password: string;
  _id: string;
  token: string;
}

export interface AuthorizedRequest extends Request {
  user?: IUser;
}
