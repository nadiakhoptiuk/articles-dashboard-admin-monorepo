import { FC } from 'react';

import { WithClassName } from '(shared)/types/common.types';
import classNames from 'classnames';

type Props = {
  data: string[];
};

export const CategoriesList: FC<Props & WithClassName> = async ({
  data,
  className = '',
}) => {
  return (
    <ul className={classNames('flex flex-wrap gap-x-3 gap-y-1', className)}>
      {data.map((category, index) => {
        const newCategory = category.replace('Новини | ', '');

        return (
          <li key={index} className="text-blue">
            <span>{newCategory}</span>
          </li>
        );
      })}
    </ul>
  );
};
