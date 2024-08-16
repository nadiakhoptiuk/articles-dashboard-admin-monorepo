'use client';

import { FC, useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { SingleValue } from 'react-select';
import classNames from 'classnames';

import { Multiselect } from '(shared)/components/ui-kit/Multiselect';
import { SingleSelect } from '(shared)/components/ui-kit/SingleSelect';

import { OptionType, WithClassName } from '(shared)/types/common.types';

export const ArticlesFilterPanel: FC<WithClassName> = ({ className = '' }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [selectedCategories, setSelectedCategories] = useState<
    OptionType[] | []
  >(format());
  const [selectedOption, setSelectedOption] = useState<SingleValue<OptionType>>(
    {
      value: '-1',
      label: 'За спаданням',
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

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('category');

    if (selectedCategories && selectedCategories.length > 0) {
      selectedCategories.forEach(category => {
        params.append('category', category.value);
      });
    }

    if (selectedOption) {
      params.set('sort', selectedOption.value);
    }

    router.push(pathname + '?' + params.toString());
  }, [pathname, router, searchParams, selectedCategories, selectedOption]);

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
        type="filter"
        label="Фільтр за категоріями:"
        className="max-w-[440px]"
      />

      <SingleSelect
        label="Фільтр за датою:"
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
      />
    </div>
  );
};
