import { ISODateString, Session, User } from 'next-auth';
import { ReactNode } from 'react';

export type WithChildren = {
  children: ReactNode;
};

export type WithId = {
  id: string;
};

export type WithClassName = {
  className?: string;
};

export interface PluginUtils {
  addVariant: (name: string, definition: string | string[]) => void;
}

export interface ArticleDBItemType {
  title: string;
  link: string;
  pubDate: Date;
  categories: string[];
  isoDate: Date;
  createdAt: Date;
  updatedAt: Date;
  imageUrl: string;
  content: string;
}

export type WithDBId = {
  _id: string;
};

export type ArticleDBItemTypeWithId = ArticleDBItemType & WithId;
export type ArticleDBItemTypeWithDBId = ArticleDBItemType & WithDBId;

export type ModalCommonProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export interface CustomUserSession extends Session {
  user?: {
    name?: string | null | undefined;
    email?: string | null | undefined;
    image?: string | null | undefined;
    jwt?: string | undefined | unknown;
  };
}

export interface CustomUser extends User {
  userData?: {
    token: string;
    email: string;
    id: string;
  };
}

export interface CreateArticleFormType {
  title: string;
  content: string;
  // imageUrl: string;
  // pubDate: Date;
  // link: string;
  // categories: string[];
}
