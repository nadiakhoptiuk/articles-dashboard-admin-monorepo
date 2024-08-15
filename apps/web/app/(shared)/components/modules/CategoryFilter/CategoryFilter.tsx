'use client';

import { FC, useState } from 'react';
import classNames from 'classnames';

import { Multiselect } from '(shared)/components/ui-kit/Multiselect';

import { formatSelectedCategories } from '(shared)/utils/categoriesFormat';

import { OptionType, WithClassName } from '(shared)/types/common.types';

export const CategoryFilter: FC<WithClassName> = ({ className = '' }) => {
  const [selectedOptions, setSelectedOptions] = useState<OptionType[] | []>([]);

  console.log(formatSelectedCategories(selectedOptions));

  return (
    <div className={classNames('', className)}>
      <Multiselect
        selectedOptions={selectedOptions}
        setSelectedOptions={setSelectedOptions}
        type="filter"
        label="Фільтр за категоріями:"
        className="w-[400px]"
      />
    </div>
  );
};
