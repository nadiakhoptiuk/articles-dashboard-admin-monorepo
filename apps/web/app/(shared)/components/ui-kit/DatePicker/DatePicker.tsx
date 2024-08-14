'use client';

import { FC } from 'react';
import { format } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import 'react-day-picker/style.css';
import { ICONS } from '(shared)/types/icons.types';

type Props = {
  selectedDate: Date;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date>>;
};

export const DatePicker: FC<Props> = ({ selectedDate, setSelectedDate }) => {
  // const [inputValue, setInputValue] = useState<string>(new Date());

  const handleDayPickerSelect = (date: Date, close: () => void) => {
    if (date) {
      setSelectedDate(date);

      close();
    }
  };

  return (
    <Popover className="relative md:h-max">
      {({ close }) => (
        <>
          <PopoverButton className="flex h-11 items-center justify-between rounded bg-white px-6 py-2 text-ui_med_18 max-md:mt-5 max-md:w-full font-nunito">
            <span className="flex items-center gap-x-3">
              <ICONS.CALENDAR size={30} className="text-navy-blue" />
              <span className="leading-[1.0]">
                {format(selectedDate, 'dd.MM.yyyy')}
              </span>
            </span>
          </PopoverButton>

          <PopoverPanel
            anchor="bottom"
            className="datePicker z-40 flex flex-col rounded bg-[#fff] px-4 py-5 shadow-[0_4px_8px_0_rgba(0,0,0,0.25)] max-md:w-[calc(100%-40px)] max-md:!max-w-[440px] md:px-5"
          >
            <DayPicker
              mode="single"
              onSelect={date => handleDayPickerSelect(date, close)}
              selected={selectedDate}
              required={true}
              weekStartsOn={1}
              hideNavigation={true}
              captionLayout="dropdown"
              startMonth={new Date()}
              endMonth={new Date(2030, 12)}
              showOutsideDays={true}
              formatters={{
                formatCaption: (date, options) =>
                  format(date, 'LLLL yyyy', options),
              }}
              classNames={{
                today: `text-navy-blue !font-bold`,
                selected: `!bg-blue text-white !rounded-none`,
              }}
            />
          </PopoverPanel>
        </>
      )}
    </Popover>
  );
};
