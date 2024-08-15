import { FC, SetStateAction } from 'react';
import Select, { MultiValue } from 'react-select';

import { OptionType, WithClassName } from '(shared)/types/common.types';
import { ICONS } from '(shared)/types/icons.types';

const categories: OptionType[] = [
  { value: 'Міжнародні', label: 'Міжнародні' },
  { value: 'Важливі', label: 'Важливі' },
  { value: 'Важливе на Свободі', label: 'Важливе на Свободі' },
  { value: 'Події', label: 'Події' },
  { value: 'Політика', label: 'Політика' },
];

type Props = {
  selectedOptions: OptionType[] | [];
  setSelectedOptions: React.Dispatch<SetStateAction<OptionType[] | []>>;
  type?: 'filter' | 'save';
  label?: string;
};

export const Multiselect: FC<Props & WithClassName> = ({
  selectedOptions,
  setSelectedOptions,
  type = 'save',
  label = 'Категорія',
  className = '',
}) => {
  const handleChange = (options: MultiValue<OptionType> | null) => {
    setSelectedOptions((options as OptionType[]) || []);
  };

  return (
    <div className={className}>
      <div className="flex gap-x-4 items-center mb-3">
        {type === 'filter' && <ICONS.FILTER size={30} className="text-blue" />}
        <span className="mr-auto text-ui_reg_20 block">{label}</span>
      </div>

      <Select<OptionType, true>
        isMulti
        name="categories"
        options={categories}
        value={selectedOptions}
        onChange={handleChange}
        classNamePrefix="react-select"
        className="mb-10"
        placeholder="Оберіть категорію"
      />
    </div>
  );
};
