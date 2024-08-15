import { FC } from 'react';

import { Modal } from '(shared)/components/ui-kit/Modal';
import { ArticleUpdateForm } from '(shared)/components/forms/ArticleUpdateForm';

import {
  ArticleDBItemTypeWithDBId,
  ModalCommonProps,
} from '(shared)/types/common.types';

type Props = {
  article: ArticleDBItemTypeWithDBId;
};

export const EditModal: FC<ModalCommonProps & Props> = ({
  isOpen,
  setIsOpen,
  article,
}) => {
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} className="max-w-[700px]">
      <p className="mb-10 text-center text-ui_bold_32">Редагування статті</p>

      <ArticleUpdateForm
        existedArticleData={article}
        setIsModalOpen={setIsOpen}
      />
    </Modal>
  );
};
