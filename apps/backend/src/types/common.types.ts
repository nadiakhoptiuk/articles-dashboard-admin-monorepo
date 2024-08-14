import { Request } from "express";
import { ObjectId } from "mongodb";

export type ArticleItemFullType = {
  title: string;
  link: string;
  pubDate: string;
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
  categories: string[];
  isoDate: string;
  imageUrl: string;
  content: string;
};

export type ArticleItemDBFullType = {
  _id: ObjectId;
  title: string;
  link: string;
  pubDate: Date;
  categories: string[];
  isoDate: Date;
  imageUrl: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  __v: any;
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
  _id: ObjectId;
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
