'use client';
import Link from 'next/link';

import { FC, useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import classNames from 'classnames';

import { WithClassName } from '(shared)/types/common.types';

type Prop = {
  count: number;
};

export const PaginationPanel: FC<Prop & WithClassName> = ({
  count,
  className,
}) => {
  const limit = 10;
  const pagesCount = Math.ceil(count / limit);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [paginationPage, setPaginationPage] = useState<number>(1);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    const pageFromUrl = params.get('page');

    setPaginationPage(Number(pageFromUrl) || 1);
  }, [searchParams]);

  const handleRouteGenerate = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set('page', page.toString());

    return pathname + '?' + params.toString();
  };

  return (
    <ul className={classNames('flex gap-x-4 mx-auto w-fit mt-20', className)}>
      {Array.from({ length: pagesCount }, (_, index) => index + 1).map(page => (
        <li key={page}>
          <Link
            href={handleRouteGenerate(page)}
            className={classNames(
              'w-14 h-14 base-shadow bg-white flex items-center justify-center text-ui_reg_28 rounded hocus:text-navy-blue hocus:bg-light base-transition',
              {
                '!bg-transparent pointer-events-none !shadow-none':
                  paginationPage === page,
              },
            )}
          >
            {page}
          </Link>
        </li>
      ))}
    </ul>
  );
};
