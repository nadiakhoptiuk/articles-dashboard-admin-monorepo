import { FC } from 'react';

import { Modal } from '(shared)/components/ui-kit/Modal';

import { ModalCommonProps } from '(shared)/types/common.types';

export const EditModal: FC<ModalCommonProps> = ({ isOpen, setIsOpen }) => {
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <div></div>
    </Modal>
  );
};
