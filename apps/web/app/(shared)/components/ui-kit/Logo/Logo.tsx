import React from 'react';
import classNames from 'classnames';

import { WithClassName } from '(shared)/types/common.types';

export const Logo: React.FC<WithClassName> = ({ className = '' }) => {
  return (
    <a
      href="/"
      className={classNames(
        'inline-block transition-transform focus:scale-110 hover:scale-110 relative z-10',
        className,
      )}
      aria-label="logo"
    >
      logo
    </a>
  );
};
