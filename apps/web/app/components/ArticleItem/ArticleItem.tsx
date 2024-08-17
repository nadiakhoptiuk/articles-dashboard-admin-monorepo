import { FC } from 'react';
import Image from 'next/image';
import { format } from 'date-fns';
import { uk } from 'date-fns/locale';
import classNames from 'classnames';

import TemplateSrc from '@/public/images/template.png';

import {
  ArticleDBItemTypeWithDBId,
  WithClassName,
} from '(shared)/types/common.types';
import { CategoriesList } from '../CategoriesList';
import { WithMode } from '../ArticlesList/Article.types';
import { ControlPanel } from '@/app/admin/components/ControlPanel';
import { ICONS } from '(shared)/types/icons.types';

type Props = {
  article: ArticleDBItemTypeWithDBId;
};

export const ArticleItem: FC<Props & WithClassName & WithMode> = ({
  article,
  className = '',
  mode = 'home',
}) => {
  const { title, content, imageUrl, pubDate, categories, link } = article;

  return (
    <li
      className={classNames(
        'grid',
        {
          'max-xl:grid-cols-2 gap-8 xl:grid-cols-[250px_auto_250px] xl:min-h-[320px]':
            mode === 'admin',
          'xl:grid-rows-[370px_auto_auto]': mode === 'home',
        },
        className,
      )}
    >
      <div
        className={classNames('shrink-0 rounded overflow-hidden base-shadow', {
          'w-full h-auto': mode === 'admin',
          'w-full h-[350px] mb-5': mode === 'home',
        })}
      >
        <Image
          src={imageUrl || TemplateSrc}
          width={642}
          height={500}
          alt={title}
          className="w-full h-full object-cover object-center group-hover:scale-[105%] base-transition duration-1000"
        />
      </div>

      <div
        className={classNames('', {
          'h-fit max-xl:w-full max-xl:col-span-2 max-xl:col-start-1 max-xl:row-start-2':
            mode === 'admin',
          '': mode === 'home',
        })}
      >
        <span
          className={classNames('text-ui_light_20 block mb-4', {
            '': mode === 'admin',
            '': mode === 'home',
          })}
        >
          {format(pubDate, 'dd MMMM y, HH:mm', { locale: uk })}
        </span>

        <h2
          className={classNames(
            'line-clamp-3 base-transition !duration-700 mb-4 ',
            {
              'md:mb-5 xl:mb-7': mode === 'admin',
              'xl:min-h-[48px]': mode === 'home',
            },
          )}
        >
          {title}
        </h2>

        {content && (
          <p
            className={classNames('line-clamp-4', {
              'xl:line-clamp-5': mode === 'admin',
              'mb-8 xl:min-h-[62px]': mode === 'home',
            })}
          >
            {content}
          </p>
        )}
      </div>

      <div
        className={classNames('grid mr-auto', {
          'max-xl:col-start-2 max-xl:row-start-1 max-xl:gap-y-10 gris-rows-2 grid-cols-1':
            mode === 'admin',
          'mt-auto': mode === 'home',
        })}
      >
        <div
          className={classNames('', {
            'max-xl:row-start-2': mode === 'admin',
            'mt-auto': mode === 'home',
          })}
        >
          {mode === 'admin' && (
            <p className="mb-4 text-ui_reg_20">Категорії:</p>
          )}
          {categories.length > 0 ? (
            <CategoriesList data={categories} className="mb-4" />
          ) : (
            <span>Відсутні</span>
          )}

          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className={classNames(
              'w-fit hocus:text-navy-blue base-transition flex items-center text-ui_reg_18 md:text-ui_reg_20 xl:text-ui_reg_28 gap-x-2',
            )}
          >
            <span className="text-ui_reg_18 w-max block">
              {mode === 'home' ? 'Читати більше' : 'Посилання на статтю'}
            </span>
            <ICONS.READ_MORE size={18} />
          </a>
        </div>

        {mode === 'admin' && (
          <ControlPanel className="row-start-1" article={article} />
        )}
      </div>
    </li>
  );
};
