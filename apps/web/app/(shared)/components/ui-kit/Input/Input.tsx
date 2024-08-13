import { useState } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import classNames from 'classnames';
import { FaEye, FaEyeSlash } from 'react-icons/fa6';

interface Props {
  label: string;
  type: 'text' | 'password' | 'email' | 'url';
  register: UseFormRegisterReturn;
  placeholder: string;
  className?: string;
  classNameInput?: string;
  value?: string;
  button?: boolean;
  error?: string | undefined;
}

export const Input = ({
  label,
  type,
  register,
  placeholder,
  className,
  classNameInput,
  value,
  button,
  error,
}: Props) => {
  const [inputType, setInputType] = useState(type);

  const togglePassword = () => {
    inputType === 'text' ? setInputType('password') : setInputType('text');
  };

  return (
    <label className={classNames('base-input mb-10', className)}>
      <span className="mr-auto text-ui_reg_20 mb-3">{label}*</span>

      <input
        className={classNames(
          'w-full py-3 px-4 rounded-sm text-ui_light_16 text-black !bg-white  font-nunito placeholder:italic',
          classNameInput,
          {
            'text-red': error,
          },
        )}
        placeholder={placeholder}
        type={inputType}
        value={value}
        {...register}
      />

      {button && (
        <button
          className="text-ui_light_16 md:text-ui_light_20 xl:text-ui_light_28 absolute right-2 bottom-1/2 translate-y-8 flex items-center justify-center w-[30px] h-[30px]"
          type="button"
          onClick={togglePassword}
          area-aria-label={
            inputType === 'password' ? 'Показати пароль' : 'Приховати пароль'
          }
        >
          {inputType === 'password' ? (
            <FaEyeSlash color="#0096c7" size="24px" />
          ) : (
            <FaEye color="#0096c7" size="22px" />
          )}
        </button>
      )}

      {error && (
        <span className="absolute bottom-[-24px] right-0 text-red text-ui_light_16">
          {error}
        </span>
      )}
    </label>
  );
};
