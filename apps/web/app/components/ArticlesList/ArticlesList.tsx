import { FC } from 'react';
import classNames from 'classnames';

import { getAllArticles } from '@/api/getAllArticles';

import { ArticleItem } from '../ArticleItem';

import {
  ArticleDBItemTypeWithDBId,
  WithClassName,
} from '(shared)/types/common.types';
import { WithMode } from './Article.types';

export const ArticlesList: FC<WithMode & WithClassName> = async ({
  mode,
  className = '',
}) => {
  const articles: ArticleDBItemTypeWithDBId[] = await getAllArticles();

  if (articles.length === 0) return null;

  return (
    <ul
      className={classNames(
        'grid grid-cols-1 md:gap-y-16',
        { 'md:grid-cols-1': mode === 'admin' },
        { 'md:grid-cols-2 md:gap-x-10': mode === 'home' },
        className,
      )}
    >
      {articles.map(({ _id, ...props }) => (
        <ArticleItem key={_id} {...props} mode={mode} id={_id} />
      ))}
    </ul>
  );
};
