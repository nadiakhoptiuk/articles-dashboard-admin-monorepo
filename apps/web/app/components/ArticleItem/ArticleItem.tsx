import { FC } from 'react';
import Image from 'next/image';
import { format } from 'date-fns';
import classNames from 'classnames';

import TemplateSrc from '@/public/images/template.png';

import {
  ArticleDBItemTypeWithId,
  WithClassName,
} from '(shared)/types/common.types';
import { CategoriesList } from '../CategoriesList';
import { WithMode } from '../ArticlesList/Article.types';
import { ControlPanel } from '@/app/admin/components/ControlPanel';

export const ArticleItem: FC<
  ArticleDBItemTypeWithId & WithClassName & WithMode
> = ({
  id,
  title,
  link,
  pubDate,
  content,
  imageUrl,
  categories,
  className = '',
  mode = 'home',
}) => {
  return (
    <li
      className={classNames(
        'flex',
        {
          'flex-row items-center gap-x-8': mode === 'admin',
          'flex-col': mode === 'home',
        },
        className,
      )}
    >
      <div
        className={classNames('shrink-0 rounded overflow-hidden ', {
          'w-[250px] h-[300px]': mode === 'admin',
          'w-full h-[350px] mb-5': mode === 'home',
        })}
      >
        <Image
          src={imageUrl || TemplateSrc}
          width={642}
          height={500}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-[105%] base-transition duration-1000"
        />
      </div>

      <div
        className={classNames('', {
          'h-fit w-[500px]': mode === 'admin',
          '': mode === 'home',
        })}
      >
        <span
          className={classNames('text-ui_light_20 block mb-4', {
            '': mode === 'admin',
            '': mode === 'home',
          })}
        >
          {format(pubDate, 'dd MMM y, kk:mm')}
        </span>

        <h2
          className={classNames(
            'line-clamp-3 base-transition !duration-700 mb-4 ',
            {
              '': mode === 'admin',
              'xl:min-h-[95px]': mode === 'home',
            },
          )}
        >
          {title}
        </h2>

        <p
          className={classNames('line-clamp-4', {
            '': mode === 'admin',
            'mb-8': mode === 'home',
          })}
        >
          {content}
        </p>
      </div>

      <div
        className={classNames('', {
          '': mode === 'admin',
          'mt-auto': mode === 'home',
        })}
      >
        {mode === 'admin' && <p>Категорії:</p>}
        <CategoriesList data={categories} className="mb-4" />

        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className={classNames(
            'w-fit hocus:text-navy-blue base-transition flex text-ui_reg_18 md:text-ui_reg_20 xl:text-ui_reg_28 ',
          )}
        >
          {mode === 'home' ? 'Читати більше' : 'Посилання на статтю'}
        </a>
      </div>

      {mode === 'admin' && <ControlPanel id={id} />}
    </li>
  );
};
