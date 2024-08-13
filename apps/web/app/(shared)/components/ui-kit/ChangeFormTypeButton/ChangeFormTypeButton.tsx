import { FC } from 'react';
import Link from 'next/link';
import classNames from 'classnames';

import { AUTH_TYPES, ROUTES } from '(shared)/types/enums';
import { WithClassName } from '(shared)/types/common.types';

type Props = {
  type: (typeof AUTH_TYPES)[keyof typeof AUTH_TYPES];
};

export const ChangeFormTypeButton: FC<Props & WithClassName> = ({
  type,
  className = '',
}) => {
  return (
    <Link
      href={type === AUTH_TYPES.LOGIN ? ROUTES.SIGN_UP : ROUTES.LOGIN}
      className={classNames('base-button', className)}
    >
      {type === AUTH_TYPES.LOGIN ? 'Зареєструватись' : 'Увійти'}
    </Link>
  );
};
