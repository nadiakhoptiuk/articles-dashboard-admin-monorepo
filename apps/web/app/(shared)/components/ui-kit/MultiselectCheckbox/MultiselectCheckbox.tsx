import { FC, SetStateAction } from 'react';
import Select, { MultiValue } from 'react-select';

import { OptionType } from '(shared)/types/common.types';

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
};

export const MultiselectCheckbox: FC<Props> = ({
  selectedOptions,
  setSelectedOptions,
}) => {
  const handleChange = (options: MultiValue<OptionType> | null) => {
    setSelectedOptions((options as OptionType[]) || []);
  };

  return (
    <Select<OptionType, true>
      isMulti
      name="categories"
      options={categories}
      value={selectedOptions}
      onChange={handleChange}
    />
  );
};
