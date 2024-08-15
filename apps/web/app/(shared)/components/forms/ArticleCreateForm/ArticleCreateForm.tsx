'use client';

import { FC, useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import classNames from 'classnames';

import { Input } from '(shared)/components/ui-kit/Input';
import { Button } from '(shared)/components/ui-kit/Button';
import { DatePicker } from '(shared)/components/ui-kit/DatePicker';
import { Multiselect } from '(shared)/components/ui-kit/Multiselect';

import { formatSelectedCategories } from '(shared)/utils/categoriesFormat';
import { createArticle } from '@/api/serverActions/createArticle';
import { notify } from '(shared)/utils/notification';

import { ArticleFormType, OptionType } from '(shared)/types/common.types';
import { ICONS } from '(shared)/types/icons.types';

type Props = {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ArticleCreateForm: FC<Props> = ({ setIsModalOpen }) => {
  const {
    register,
    reset,
    getValues,
    trigger,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<ArticleFormType>({
    defaultValues: {
      imageUrl:
        'https://res.cloudinary.com/dwl283wrt/image/upload/v1723717088/%D1%82%D0%B5%D1%81%D1%82%D0%BE%D0%B2%D1%96%20%D0%B7%D0%B0%D0%B2%D0%B4%D0%B0%D0%BD%D0%BD%D1%8F/image-placeholder_q0dycu.svg',
    },
  });
  const [isPending, startTransition] = useTransition();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedOptions, setSelectedOptions] = useState<OptionType[] | []>([]);

  const handleArticleCreate = async () => {
    const formValues = getValues();
    const articleFormData = {
      ...formValues,
      pubDate: selectedDate,
      isoDate: selectedDate,
      categories: formatSelectedCategories(selectedOptions),
    };

    startTransition(() => {
      createArticle(articleFormData)
        .then(status => {
          if (status === 201) {
            notify('Статтю створено успішно!');
            reset();
            setIsModalOpen(false);
          } else {
            notify('Не вдалось створити статтю');
          }
        })
        .catch(console.log);
    });
  };

  return (
    <form
      className="w-full max-w-[500px] mx-auto mb-16"
      autoComplete="off"
      onSubmit={handleSubmit(handleArticleCreate)}
    >
      <DatePicker
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />

      <Multiselect
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
          pattern: {
            value: new RegExp('^[\\p{L}\'"«»()’.,;:?–!\\-w\\s\\n\\d]+$', 'u'),
            message: 'Не відповідає шаблону',
          },
          minLength: {
            value: 6,
            message: 'Мінімальна кількість символів - 6',
          },
          maxLength: {
            value: 200,
            message: 'Максимальна кількість символів - 200',
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
          pattern: {
            value: new RegExp('^[\\p{L}\'"«»()’.,;:?–!\\-w\\s\\n\\d]+$', 'u'),
            message: 'Не відповідає шаблону',
          },
          minLength: {
            value: 6,
            message: 'Мінімальна кількість символів - 6',
          },
          maxLength: {
            value: 200,
            message: 'Максимальна кількість символів - 200',
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
          pattern: {
            value: /^https:\/\/[\w\d:/.=?-]{10,}$/,
            message: 'Не відповідає шаблону',
          },
          minLength: {
            value: 10,
            message: 'Мінімальна кількість символів - 10',
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
          getValues().link === '' ||
          getValues().content === '' ||
          !isDirty ||
          Boolean(errors.content || errors.title || errors.link) ||
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
          <span>Створити</span>
        )}
      </Button>
    </form>
  );
};
