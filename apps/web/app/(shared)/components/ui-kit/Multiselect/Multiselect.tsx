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
  selectedOptions: MultiValue<OptionType>;
  setSelectedOptions: React.Dispatch<SetStateAction<MultiValue<OptionType>>>;
  type?: 'filter' | 'save';
  label?: string;
  onChange?: (args: MultiValue<OptionType>) => void;
};

export const Multiselect: FC<Props & WithClassName> = ({
  selectedOptions,
  setSelectedOptions,
  onChange,
  type = 'save',
  label = 'Категорія',
  className = '',
}) => {
  const handleChange = (options: MultiValue<OptionType> | null) => {
    onChange && onChange(options ?? []);
    setSelectedOptions(options ?? []);
  };

  return (
    <div className={className}>
      <div className="flex gap-x-4 items-center mb-3">
        {type === 'filter' && <ICONS.FILTER size={30} className="text-blue" />}
        <span className="mr-auto text-ui_reg_20 block">{label}</span>
      </div>

      <Select<OptionType, true>
        isMulti
        instanceId="react-multi-select"
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
