'use client';

import { FC } from 'react';
import { signOut } from 'next-auth/react';

import { ICONS } from '(shared)/types/icons.types';
import { ROUTES } from '(shared)/types/enums';

export const LogOutButton: FC = () => {
  return (
    <button
      className="nav-button"
      type="button"
      onClick={() => signOut({ callbackUrl: ROUTES.HOME })}
    >
      <ICONS.LOGOUT size={30} />
      <span>Вийти</span>
    </button>
  );
};
