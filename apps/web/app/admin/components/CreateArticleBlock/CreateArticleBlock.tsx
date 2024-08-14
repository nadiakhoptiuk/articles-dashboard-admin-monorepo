'use client';

import { FC, useState } from 'react';

import { Container } from '(shared)/components/ui-kit/Container';

import { ICONS } from '(shared)/types/icons.types';
import { CreateModal } from '../CreateModal/CreateModal';

export const CreateArticleBlock: FC = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  return (
    <section className="section pb-0">
      <Container className="border-b-[1px] border-blue pb-20">
        <button
          type="button"
          className="w-fit ml-auto h-24 base-shadow flex gap-x-4 items-center justify-center bg-white rounded base-transition py-4 px-5"
          aria-label="Створити нову статтю"
          onClick={() => setIsCreateModalOpen(true)}
        >
          <ICONS.CREATE size={30} className="text-navy-blue" />
          <span>Створити нову статтю</span>
        </button>

        <CreateModal
          isOpen={isCreateModalOpen}
          setIsOpen={setIsCreateModalOpen}
        />
      </Container>
    </section>
  );
};
