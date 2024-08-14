import { FC } from 'react';

import { Modal } from '(shared)/components/ui-kit/Modal';

import { ModalCommonProps } from '(shared)/types/common.types';
import { ArticleCreateForm } from '(shared)/components/forms/ArticleCreateForm';

export const CreateModal: FC<ModalCommonProps> = ({ isOpen, setIsOpen }) => {
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <p className="mb-10 text-center text-ui_bold_32">Створення статті</p>

      <ArticleCreateForm setIsModalOpen={setIsOpen} />
    </Modal>
  );
};
