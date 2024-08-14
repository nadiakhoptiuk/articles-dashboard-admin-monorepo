'use client';

import { FC, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import classNames from 'classnames';

import { Input } from '(shared)/components/ui-kit/Input';
import { Button } from '(shared)/components/ui-kit/Button';

import { createArticle } from '@/api/serverActions.ts/createArticle';
import { notify } from '(shared)/utils/notification';

import { CreateArticleFormType } from '(shared)/types/common.types';
import { ICONS } from '(shared)/types/icons.types';

type Props = {
  type: 'create' | 'edit';
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ArticleControlForm: FC<Props> = ({ type, setIsModalOpen }) => {
  const {
    register,
    // handleSubmit,
    reset,
    getValues,
    trigger,
    formState: { errors, isDirty },
  } = useForm<CreateArticleFormType>();
  const [isPending, startTransition] = useTransition();

  const handleArticleCreate = async () => {
    const formValues = getValues();

    startTransition(async () => {
      await createArticle(formValues)
        .then(status => {
          if (status === 200) {
            notify('Статтю створено успішно!');
            reset();
            () => setIsModalOpen(false);
          } else {
            notify('Не вдалось створити статтю');
          }
        })
        .catch(console.log);
    });
  };

  // const handleArticleUpdate = async (id: string) => {
  //   startTransition(async () => {
  //     await updateArticle(id)
  //       .then(status => {
  //         if (status === 200) {
  //           notify('Видалено успішно!');
  //         } else {
  //           notify('Не вдалось видалити');
  //         }
  //       })
  //       .catch(console.log)
  //       .finally(() => setIsOpen(false));
  //   });
  // };

  return (
    <form
      // onSubmit={handleSubmit(
      //   type === 'create' ? handleCreateArticle : handleUpdateArticle,
      // )}
      className="w-[400px] mx-auto mb-16"
      autoComplete="off"
      action={handleArticleCreate}
    >
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

      <Button
        type="submit"
        isDisabled={
          getValues().title === '' ||
          getValues().content === '' ||
          !isDirty ||
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
          <p>{type === 'create' ? 'Створити' : 'Зберегти'}</p>
        )}
      </Button>
    </form>
  );
};
