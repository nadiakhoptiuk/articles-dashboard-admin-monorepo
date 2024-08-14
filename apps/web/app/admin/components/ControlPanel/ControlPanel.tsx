'use client';

import { FC, useState } from 'react';

import { EditModal } from '../EditModal';
import { DeleteModal } from '../DeleteModal';

import { ICONS } from '(shared)/types/icons.types';

type Props = {
  id: string;
};

export const ControlPanel: FC<Props> = ({ id }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  return (
    <>
      <ul className="grid gap-y-4">
        <li>
          <button
            type="button"
            className="w-24 h-24 base-shadow flex items-center justify-center hocus:bg-white rounded base-transition"
            aria-label="Редагувати статтю"
            onClick={() => setIsEditModalOpen(true)}
          >
            <ICONS.EDIT size={30} />
          </button>
        </li>

        <li>
          <button
            type="button"
            className="w-24 h-24 base-shadow flex items-center justify-center hocus:bg-white rounded base-transition"
            aria-label="Видалити статтю"
            onClick={() => setIsDeleteModalOpen(true)}
          >
            <ICONS.DELETE size={30} />
          </button>
        </li>
      </ul>

      <EditModal isOpen={isEditModalOpen} setIsOpen={setIsEditModalOpen} />
      <DeleteModal
        isOpen={isDeleteModalOpen}
        setIsOpen={setIsDeleteModalOpen}
        id={id}
      />
    </>
  );
};
