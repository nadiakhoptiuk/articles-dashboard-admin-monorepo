import { FC, SetStateAction } from 'react';
import Select, { SingleValue } from 'react-select';

import { OptionType } from '(shared)/types/common.types';
import { ICONS } from '(shared)/types/icons.types';

const options: OptionType[] = [
  { value: '1', label: 'За зростанням' },
  { value: '-1', label: 'За спаданням' },
];

type Props = {
  label: string;
  selectedOption: SingleValue<OptionType>;
  setSelectedOption: React.Dispatch<SetStateAction<SingleValue<OptionType>>>;
};

export const SingleSelect: FC<Props> = ({
  label,
  selectedOption,
  setSelectedOption,
}) => {
  return (
    <div className="w-full max-w-[440px]">
      <div className="flex gap-x-4 items-center mb-3">
        <ICONS.CALENDAR size={30} className="text-blue" />
        <span className="mr-auto text-ui_reg_20 block">{label}</span>
      </div>

      <Select<OptionType>
        instanceId="react-select"
        name="date"
        options={options}
        value={selectedOption}
        defaultValue={options[1]}
        onChange={setSelectedOption}
        classNamePrefix="react-select"
        className="mb-10"
      />
    </div>
  );
};
