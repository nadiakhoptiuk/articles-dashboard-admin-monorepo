import { OptionType } from '(shared)/types/common.types';

export const formatSelectedCategories = (
  selectedOptions: OptionType[] | [],
) => {
  return selectedOptions.map(({ value }) => value);
};
