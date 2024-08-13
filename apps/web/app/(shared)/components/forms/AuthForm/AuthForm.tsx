'use client';

import { FC } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { signIn } from 'next-auth/react';

import { Input } from '(shared)/components/ui-kit/Input';
import { Button } from '(shared)/components/ui-kit/Button';

import { notify } from '(shared)/utils/notification';
import { emailRegExp } from '(shared)/utils/regexp';
// import { passwordRegExp } from '(shared)/utils/regexp';

import { AUTH_TYPES, ROUTES } from '(shared)/types/enums';

export interface FormAuthProps {
  typeAuth: (typeof AUTH_TYPES)[keyof typeof AUTH_TYPES];
}

interface FormInputsType {
  email: string;
  password: string;
}

export const AuthForm: FC<FormAuthProps> = ({ typeAuth }) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    trigger,
    formState: { errors, isDirty },
  } = useForm<FormInputsType>({});

  const handleCommonAuth = async (data: FormInputsType) => {
    return await signIn('credentials', {
      ...data,
      mode: typeAuth,
      redirect: false,
    });
  };

  const handleSubmitLogIn = async (data: FormInputsType) => {
    const res = await handleCommonAuth(data);

    if (res && !res.error) {
      reset();
      router.push(ROUTES.ADMIN);
    } else {
      notify.error('Не вдалося увійти');
      // console.log(res?.error, res?.status);
    }
  };

  const handleSubmitRegistration = async (data: FormInputsType) => {
    const res = await handleCommonAuth(data);

    if (res && !res.error) {
      reset();
      router.push(ROUTES.LOGIN);
    } else {
      notify.error('Не вдалося зареєструвати користувача');
      // console.log(res?.error, res?.status);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(
        typeAuth === AUTH_TYPES.LOGIN
          ? handleSubmitLogIn
          : handleSubmitRegistration,
      )}
      className="w-[400px] mx-auto mb-16"
      autoComplete="off"
    >
      <Input
        label="Електронна пошта"
        register={register('email', {
          required: {
            value: true,
            message: 'Це поле обов"язкове',
          },
          pattern: {
            value: new RegExp(emailRegExp),
            message: 'Не відповідає шаблону',
          },
          minLength: {
            value: 6,
            message: 'Мінімальна кількість символів - 6',
          },
          maxLength: {
            value: 63,
            message: 'Максимальна кількість символів - 63',
          },
          onChange: () => {
            trigger('email');
          },
        })}
        error={errors.email?.message}
        placeholder="example@gmail.com"
        type="text"
        className="base-input"
        classNameInput=""
      />

      <Input
        label="Пароль"
        register={register('password', {
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
            trigger('password');
          },
        })}
        error={errors.password?.message}
        placeholder="********"
        type="password"
        button
        className="base-input"
        classNameInput=""
      />

      <Button
        type="submit"
        isDisabled={
          getValues().email === '' ||
          getValues().password === '' ||
          !isDirty ||
          Boolean(errors.password) ||
          Boolean(errors.email)
        }
        className="mx-auto submit-button"
      >
        {typeAuth === AUTH_TYPES.LOGIN ? 'Увійти' : 'Зареєструватись'}
      </Button>
    </form>
  );
};
