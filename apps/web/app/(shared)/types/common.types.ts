import { ReactNode } from 'react';

export type WithChildren = {
  children: ReactNode;
};

export type WithClassName = {
  className?: string;
};

export interface PluginUtils {
  addVariant: (name: string, definition: string | string[]) => void;
}

export interface ArticleDBItemType {
  _id: string;
  title: string;
  link: string;
  pubDate: Date;
  author: string;
  categories: string[];
  isoDate: Date;
  createdAt: Date;
  updatedAt: Date;
}
