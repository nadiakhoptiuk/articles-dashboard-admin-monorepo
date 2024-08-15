import { FC } from 'react';
import classNames from 'classnames';

import { getAllArticles } from '@/api/getAllArticles';

import { ArticleItem } from '../ArticleItem';

import {
  ArticleDBItemTypeWithDBId,
  WithClassName,
} from '(shared)/types/common.types';
import { WithMode } from './Article.types';
import { CategoryFilter } from '(shared)/components/modules/CategoryFilter';

export const ArticlesList: FC<WithMode & WithClassName> = async ({
  mode = 'home',
  className = '',
}) => {
  const articles: ArticleDBItemTypeWithDBId[] = await getAllArticles();

  if (articles.length === 0) return null;

  return (
    <>
      <CategoryFilter className="!mb-11" />

      <ul
        className={classNames(
          'grid max-md:grid-cols-1 md:gap-y-16 md:gap-x-10 max-md:gap-y-11',
          { 'md:grid-cols-1 xl:grid-cols-1': mode === 'admin' },
          { 'md:grid-cols-2 ': mode === 'home' },
          className,
        )}
      >
        {articles.map(article => (
          <ArticleItem key={article._id} article={article} mode={mode} />
        ))}
      </ul>
    </>
  );
};
