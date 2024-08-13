import { FC } from 'react';
import { format } from 'date-fns';

import { ArticleDBItemType, WithClassName } from '(shared)/types/common.types';
import classNames from 'classnames';
import Image from 'next/image';

export const ArticleItem: FC<ArticleDBItemType & WithClassName> = ({
  title,
  link,
  pubDate,
  author,
  content,
  url,
  categories,
  className = '',
}) => {
  return (
    <li className={classNames('', className)}>
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full h-full"
      >
        <Image src={url} width={500} height={500} alt={title} />
        <h2>{title}</h2>
        <p>{author}</p>
        <p>{content}</p>
        <span>{format(pubDate, 'dd MMM y')}</span>

        <ul>
          {categories.map((category, index) => (
            <li key={index}>{category}</li>
          ))}
        </ul>
      </a>
    </li>
  );
};
