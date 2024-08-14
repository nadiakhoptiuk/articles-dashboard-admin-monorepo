'use client';

import { FC, useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import classNames from 'classnames';

import { Input } from '(shared)/components/ui-kit/Input';
import { Button } from '(shared)/components/ui-kit/Button';
import { DatePicker } from '(shared)/components/ui-kit/DatePicker';
import { MultiselectCheckbox } from '(shared)/components/ui-kit/MultiselectCheckbox';

import { updateArticle } from '@/api/serverActions/updateArticle';
import { notify } from '(shared)/utils/notification';

import {
  ArticleDBItemTypeWithDBId,
  ArticleFormType,
  OptionType,
} from '(shared)/types/common.types';
import { ICONS } from '(shared)/types/icons.types';

type Props = {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  existedArticleData: ArticleDBItemTypeWithDBId;
};

export const ArticleUpdateForm: FC<Props> = ({
  setIsModalOpen,
  existedArticleData,
}) => {
  const { _id, categories, pubDate, ...articleData } = existedArticleData;
  const newCategories = categories.map(category => ({
    value: category,
    label: category,
  }));

  const {
    register,
    reset,
    getValues,
    trigger,
    formState: { errors },
  } = useForm<ArticleFormType>({
    defaultValues: {
      ...articleData,
    },
  });
  const [isPending, startTransition] = useTransition();
  const [selectedDate, setSelectedDate] = useState(new Date(pubDate));
  const [selectedOptions, setSelectedOptions] = useState<OptionType[] | []>(
    newCategories,
  );

  const handleArticleUpdate = async () => {
    const formValues = getValues();
    const articleFormData = {
      ...formValues,
      pubDate: selectedDate,
      isoDate: selectedDate,
      categories: selectedOptions.map(({ value }) => value),
    };

    startTransition(async () => {
      await updateArticle(articleFormData, _id)
        .then(status => {
          if (status === 200) {
            notify('Статтю успішно оновлено!');
            setIsModalOpen(false);
          } else {
            notify('Не вдалось оновити статтю');
          }
        })
        .catch(console.log);
    });
  };

  return (
    <form
      className="w-[400px] mx-auto mb-16"
      autoComplete="off"
      action={handleArticleUpdate}
    >
      <DatePicker
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />

      <MultiselectCheckbox
        selectedOptions={selectedOptions}
        setSelectedOptions={setSelectedOptions}
      />

      <Input
        label="Заголовок"
        register={register('title', {
          required: {
            value: true,
            message: 'Це поле обов"язкове',
          },
          // pattern: {
          //   value: ,
          //   message: 'Не відповідає шаблону',
          // },
          minLength: {
            value: 6,
            message: 'Мінімальна кількість символів - 6',
          },
          maxLength: {
            value: 63,
            message: 'Максимальна кількість символів - 63',
          },
          onChange: () => {
            trigger('title');
          },
        })}
        error={errors.title?.message}
        placeholder="Заголовок статті"
        type="text"
        className="base-input"
        classNameInput=""
      />
      <Input
        label="Опис"
        register={register('content', {
          required: {
            value: true,
            message: 'Це поле обов"язкове',
          },
          // pattern: {
          // value: new RegExp(passwordRegExp),
          // message: 'Не відповідає шаблону',
          // },
          minLength: {
            value: 6,
            message: 'Мінімальна кількість символів - 6',
          },
          maxLength: {
            value: 32,
            message: 'Максимальна кількість символів - 32',
          },
          onChange: () => {
            trigger('content');
          },
        })}
        error={errors.content?.message}
        placeholder="Короткий опис"
        type="text"
        className="base-input"
        classNameInput=""
      />

      <Input
        label="Посилання"
        register={register('link', {
          required: {
            value: true,
            message: 'Це поле обов"язкове',
          },
          // pattern: {
          //   value: ,
          //   message: 'Не відповідає шаблону',
          // },
          minLength: {
            value: 6,
            message: 'Мінімальна кількість символів - 6',
          },
          onChange: () => {
            trigger('link');
          },
        })}
        error={errors.link?.message}
        placeholder="Посилання на статтю"
        type="text"
        className=""
        classNameInput="base-input"
      />

      <Button
        type="submit"
        isDisabled={
          getValues().title === '' ||
          getValues().content === '' ||
          Boolean(errors.content || errors.title) ||
          isPending
        }
        className="mx-auto submit-button"
      >
        {isPending ? (
          <ICONS.SPINNER
            size={30}
            className={classNames({
              'animate-spin text-navy-blue pointer-events-none': isPending,
            })}
          />
        ) : (
          <span>Оновити</span>
        )}
      </Button>
    </form>
  );
};
