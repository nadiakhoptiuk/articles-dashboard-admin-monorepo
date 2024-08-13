import { FC } from 'react';
import Link from 'next/link';

import { ROUTES } from '(shared)/types/enums';
import classNames from 'classnames';
import { WithClassName } from '(shared)/types/common.types';
import { NAV_ICONS } from '(shared)/types/icons.types';

type Props = {
  href: (typeof ROUTES)[keyof typeof ROUTES];
  label: string;
  icon: keyof typeof NAV_ICONS;
  currentPath: (typeof ROUTES)[keyof typeof ROUTES];
  className?: string;
};

export const NavLink: FC<Props & WithClassName> = ({
  href,
  label,
  icon,
  currentPath,
  className = '',
}) => {
  const Icon = NAV_ICONS[icon];

  return (
    <li className="w-fit">
      <Link
        href={href}
        className={classNames(
          'nav-button',
          { 'nav-button-active': currentPath === href },
          className,
        )}
      >
        <Icon size={30} />
        <span>{label}</span>
      </Link>
    </li>
  );
};
