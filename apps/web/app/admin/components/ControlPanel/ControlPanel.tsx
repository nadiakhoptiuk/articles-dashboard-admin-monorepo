'use client';

import { FC, useState } from 'react';

import { EditModal } from '../EditModal';
import { DeleteModal } from '../DeleteModal';

import { ICONS } from '(shared)/types/icons.types';
import {
  ArticleDBItemTypeWithDBId,
  WithClassName,
} from '(shared)/types/common.types';
import classNames from 'classnames';

type Props = {
  article: ArticleDBItemTypeWithDBId;
};

export const ControlPanel: FC<Props & WithClassName> = ({
  article,
  className = '',
}) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  return (
    <>
      <ul
        className={classNames(
          'grid gap-y-4 grid-cols-2 gap-x-4 w-fit',
          className,
        )}
      >
        <li>
          <button
            type="button"
            className="w-24 h-24 base-shadow flex items-center justify-center bg-white rounded base-transition hocus: text-navy-blue"
            aria-label="Редагувати статтю"
            onClick={() => setIsEditModalOpen(true)}
          >
            <ICONS.EDIT size={30} />
          </button>
        </li>

        <li>
          <button
            type="button"
            className="w-24 h-24 base-shadow flex items-center justify-center bg-white rounded base-transition hocus: text-navy-blue"
            aria-label="Видалити статтю"
            onClick={() => setIsDeleteModalOpen(true)}
          >
            <ICONS.DELETE size={30} />
          </button>
        </li>
      </ul>

      <EditModal
        isOpen={isEditModalOpen}
        setIsOpen={setIsEditModalOpen}
        article={article}
      />
      <DeleteModal
        isOpen={isDeleteModalOpen}
        setIsOpen={setIsDeleteModalOpen}
        id={article._id}
      />
    </>
  );
};
