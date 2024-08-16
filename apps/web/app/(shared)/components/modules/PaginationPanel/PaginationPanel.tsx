'use client';

import { FC, useEffect, useState } from 'react';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
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
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [paginationPage, setPaginationPage] = useState<number>(1);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    params.set('page', paginationPage.toString());

    router.push(pathname + '?' + params.toString());
  }, [paginationPage, pathname, router, searchParams]);

  return (
    <ul className={classNames('flex gap-x-4 mx-auto w-fit mt-20', className)}>
      {Array.from({ length: pagesCount }, (_, index) => index + 1).map(page => (
        <li key={page}>
          <button
            type="button"
            onClick={() => setPaginationPage(page)}
            className={classNames(
              'max-md:w-14 max-md:h-14 md:w-20 md:h-20 base-shadow bg-white flex items-center justify-center max-md:text-ui_reg_28 md:text-ui_reg_32 rounded hocus:text-navy-blue hocus:bg-light base-transition',
              {
                '!bg-transparent pointer-events-none !shadow-none':
                  paginationPage === page,
              },
            )}
          >
            {page}
          </button>
        </li>
      ))}
    </ul>
  );
};
