import { FC } from 'react';
import { WithChildren } from '(shared)/types/common.types';
import classNames from 'classnames';

type Props = {
  type: 'button' | 'submit';
  isDisabled?: boolean;
  className?: string;
};

export const Button: FC<Props & WithChildren> = ({
  type,
  children,
  isDisabled = false,
  className = '',
}) => {
  return (
    <button
      type={type}
      className={classNames('base-button', className)}
      disabled={isDisabled}
    >
      {children}
    </button>
  );
};
