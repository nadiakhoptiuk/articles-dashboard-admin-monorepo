import { FC } from 'react';
import Link from 'next/link';
import classNames from 'classnames';

import { ROUTES } from '(shared)/types/enums';
import { WithClassName } from '(shared)/types/common.types';
import { ICONS } from '(shared)/types/icons.types';

type Props = {
  href: (typeof ROUTES)[keyof typeof ROUTES];
  label: string;
  icon: keyof typeof ICONS;
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
  const Icon = ICONS[icon];

  return (
    <li className="w-fit h-auto">
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
