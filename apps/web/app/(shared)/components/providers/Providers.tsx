'use client';

import { FC } from 'react';
import { SessionProvider } from 'next-auth/react';

import { WithChildren } from '(shared)/types/common.types';

export const Providers: FC<WithChildren> = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};
