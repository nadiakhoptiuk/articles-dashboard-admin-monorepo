import { FC, SetStateAction } from 'react';
import Select, { SingleValue } from 'react-select';

import { OptionType } from '(shared)/types/common.types';
import { ICONS } from '(shared)/types/icons.types';

const options: OptionType[] = [
  { value: '1', label: 'Спочатку старі' },
  { value: '-1', label: 'Спочатку нові' },
];

type Props = {
  label: string;
  selectedOption: SingleValue<OptionType>;
  setSelectedOption: React.Dispatch<SetStateAction<SingleValue<OptionType>>>;
  onChange: (arg: SingleValue<OptionType>) => void;
};

export const SingleSelect: FC<Props> = ({
  label,
  selectedOption,
  setSelectedOption,
  onChange,
}) => {
  const handleChange = (option: SingleValue<OptionType>) => {
    setSelectedOption(option);
    onChange(option);
  };

  return (
    <div className="w-full max-w-[440px]">
      <div className="flex gap-x-4 items-center mb-3">
        <ICONS.SORT size={30} className="text-blue rotate-90" />
        <span className="mr-auto text-ui_reg_20 block">{label}</span>
      </div>

      <Select<OptionType>
        instanceId="react-select"
        name="date"
        options={options}
        value={selectedOption}
        defaultValue={options[1]}
        onChange={handleChange}
        classNamePrefix="react-select"
        className="mb-10"
      />
    </div>
  );
};
