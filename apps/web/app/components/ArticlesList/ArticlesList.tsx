import { FC } from 'react';

import classNames from 'classnames';

import { PaginationPanel } from '(shared)/components/modules/PaginationPanel/PaginationPanel';
import { ArticleItem } from '../ArticleItem';
import { ArticlesFilterPanel } from '(shared)/components/modules/ArticlesFilterPanel';

import { getAllArticles } from '@/api/getAllArticles';

import {
  SearchParamsPropsType,
  FetchAllArticlesDataType,
  WithClassName,
} from '(shared)/types/common.types';
import { WithMode } from './Article.types';
import { notify } from '(shared)/utils/notification';

export const ArticlesList: FC<
  SearchParamsPropsType & WithMode & WithClassName
> = async ({ searchParams, mode = 'home', className = '' }) => {
  const data: FetchAllArticlesDataType = await getAllArticles(searchParams);

  if (data.error) notify(data.error);
  const { articles, count } = data;

  return (
    <>
      <ArticlesFilterPanel />

      {!data?.error && count !== 0 && (
        <>
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

          <PaginationPanel count={count} />
        </>
      )}
    </>
  );
};
