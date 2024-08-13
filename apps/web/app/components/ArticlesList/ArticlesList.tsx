import { getAllArticles } from '@/api/getAllArticles';

import { ArticleItem } from '../ArticleItem';

import { ArticleDBItemTypeWithId } from '(shared)/types/common.types';

export const ArticlesList = async () => {
  const articles: ArticleDBItemTypeWithId[] = await getAllArticles();

  if (articles.length === 0) return null;

  return (
    <ul>
      {articles.map(({ _id, ...props }) => (
        <ArticleItem key={_id} {...props} />
      ))}
    </ul>
  );
};
