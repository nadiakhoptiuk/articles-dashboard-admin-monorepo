import { FC } from 'react';
import { format } from 'date-fns';

import { ArticleDBItemType, WithClassName } from '(shared)/types/common.types';

export const ArticleItem: FC<ArticleDBItemType & WithClassName> = ({
  title,
  link,
  pubDate,
  author,
  categories,
}) => {
  return (
    <li>
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full h-full"
      >
        <h2>{title}</h2>
        <p>{author}</p>
        <span>{format(pubDate, 'dd MMM Y')}</span>

        <ul>
          {categories.map(category => (
            <li>{category}</li>
          ))}
        </ul>
      </a>
    </li>
  );
};
