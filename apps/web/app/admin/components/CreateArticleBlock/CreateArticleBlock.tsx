'use client';

import { FC, useState } from 'react';

import { Container } from '(shared)/components/ui-kit/Container';

import { ICONS } from '(shared)/types/icons.types';
import { CreateModal } from '../CreateModal/CreateModal';

export const CreateArticleBlock: FC = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  return (
    <section className="section pb-0 pt-10">
      <Container className="border-b-[1px] border-blue pb-12">
        <button
          type="button"
          className="control-btn !w-max ml-auto gap-x-4 items-center justify-centerpy-4 px-5"
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
