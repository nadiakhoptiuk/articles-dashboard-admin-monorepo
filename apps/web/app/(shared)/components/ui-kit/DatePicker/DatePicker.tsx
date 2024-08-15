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
  label?: string;
};

export const DatePicker: FC<Props> = ({
  selectedDate,
  setSelectedDate,
  label = 'Дата публікації',
}) => {
  const handleDayPickerSelect = (date: Date, close: () => void) => {
    if (date) {
      setSelectedDate(date);

      close();
    }
  };

  return (
    <div className="mb-10">
      <span className="mr-auto text-ui_reg_20 mb-3 block">{label}</span>

      <Popover className="relative md:h-max">
        {({ close }) => (
          <>
            <PopoverButton className="flex items-center justify-between rounded bg-white px-4 py-3 text-ui_reg_16 w-full font-nunito h-[48px]">
              <span className="text-ui_reg_16">
                {format(selectedDate, 'dd.MM.yyyy')}
              </span>
              <ICONS.CALENDAR size={30} className="text-navy-blue" />
            </PopoverButton>

            <PopoverPanel
              anchor="bottom"
              className="datePicker z-40 flex flex-col rounded bg-white px-5 pb-5 base-shadow w-max"
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
                  selected: `!bg-blue text-white !rounded-none hover:!bg-navy-blue !bg-blue base-transition`,
                }}
              />
            </PopoverPanel>
          </>
        )}
      </Popover>
    </div>
  );
};
