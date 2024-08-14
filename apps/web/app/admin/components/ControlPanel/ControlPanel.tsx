'use client';

import { FC, useState } from 'react';

import { EditModal } from '../EditModal';
import { DeleteModal } from '../DeleteModal';

import { ICONS } from '(shared)/types/icons.types';
import { ArticleDBItemTypeWithDBId } from '(shared)/types/common.types';

type Props = {
  article: ArticleDBItemTypeWithDBId;
};

export const ControlPanel: FC<Props> = ({ article }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  return (
    <>
      <ul className="grid gap-y-4">
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
