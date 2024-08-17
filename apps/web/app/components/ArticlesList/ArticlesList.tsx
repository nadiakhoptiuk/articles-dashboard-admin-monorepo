import { FC } from 'react';
import Link from 'next/link';
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
import { ROUTES } from '(shared)/types/enums';

export const ArticlesList: FC<
  SearchParamsPropsType & WithMode & WithClassName
> = async ({ searchParams, mode = 'home', className = '' }) => {
  const data: FetchAllArticlesDataType = await getAllArticles(searchParams);
  const { articles, count, error } = data;

  if (error)
    return (
      <div>
        <p className="text-center mb-8">
          Сталася помилка, повторіть запит пізніше
        </p>
        <Link
          href={ROUTES.HOME}
          className="mx-auto block w-fit base-button text-ui_reg_18 px-6"
        >
          Перезавантажити
        </Link>
      </div>
    );

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

      {!error && count === 0 && <p>Новин за вашим запитом не знайдено</p>}
    </>
  );
};
