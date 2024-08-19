'use client';

import { FC, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { MultiValue, SingleValue } from 'react-select';
import classNames from 'classnames';

import { Multiselect } from '(shared)/components/ui-kit/Multiselect';
import { SingleSelect } from '(shared)/components/ui-kit/SingleSelect';

import { OptionType, WithClassName } from '(shared)/types/common.types';

export const ArticlesFilterPanel: FC<WithClassName> = ({ className = '' }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [selectedCategories, setSelectedCategories] =
    useState<MultiValue<OptionType>>(format());
  const [selectedOption, setSelectedOption] = useState<SingleValue<OptionType>>(
    {
      value: '-1',
      label: 'Спочатку нові',
    },
  );

  function format() {
    const categories = searchParams.getAll('category');
    if (!categories) {
      return [];
    }
    return categories.map(el => {
      return { label: el, value: el };
    });
  }

  const handleDateSortingChange = (option: SingleValue<OptionType>) => {
    const params = new URLSearchParams(searchParams.toString());

    if (option) {
      params.set('sort', option.value);
    }

    router.push(pathname + '?' + params.toString());
  };

  const handleCategoryChange = (options: MultiValue<OptionType> | []) => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('category');

    options.forEach(category => {
      params.append('category', category.value);
    });

    params.set('page', '1');
    router.push(pathname + '?' + params.toString());
  };

  return (
    <div
      className={classNames(
        'grid gap-x-10 mb-11 max-md:grid-cols-1 max-md:grid-rows-2 md:grid-cols-2 xl:max-w-[900px]',
        className,
      )}
    >
      <Multiselect
        selectedOptions={selectedCategories}
        setSelectedOptions={setSelectedCategories}
        onChange={handleCategoryChange}
        type="filter"
        label="Фільтр за категоріями:"
        className="max-w-[440px]"
      />

      <SingleSelect
        label="Сортування за датою:"
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
        onChange={handleDateSortingChange}
      />
    </div>
  );
};
