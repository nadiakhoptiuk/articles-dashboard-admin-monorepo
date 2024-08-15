'use client';
import { FC } from 'react';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';

import { NavLink } from '../NavLink';
import { LogOutButton } from '../LogOutButton';

import { ROUTES } from '(shared)/types/enums';

export const NavBar: FC = () => {
  const pathname = usePathname();
  const session = useSession();

  const { status, data } = session;

  const isExpiredToken = data?.expires && new Date(data?.expires) < new Date();
  const isUserAuthenticated = status === 'authenticated' && !isExpiredToken;

  return (
    <nav className="flex justify-between w-full mx-auto">
      <ul className="w-fit grid grid-rows-1 grid-cols-2 max-md:gap-x-5 md:gap-x-10 justify-between">
        <NavLink
          href={ROUTES.HOME}
          label="Головна"
          icon="HOME"
          currentPath={pathname}
        />

        {status === 'loading' ? null : isUserAuthenticated ? (
          <NavLink
            href={ROUTES.ADMIN}
            label="Адмінпанель"
            icon="ADMIN"
            currentPath={pathname}
          />
        ) : (
          <NavLink
            href={ROUTES.LOGIN}
            label="Увійти"
            icon="LOGIN"
            currentPath={pathname}
          />
        )}
      </ul>

      {isUserAuthenticated && <LogOutButton />}
    </nav>
  );
};
