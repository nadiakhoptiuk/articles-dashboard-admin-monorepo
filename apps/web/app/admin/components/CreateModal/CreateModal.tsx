import { FC } from 'react';

import { Modal } from '(shared)/components/ui-kit/Modal';

import { ModalCommonProps } from '(shared)/types/common.types';
import { ArticleControlForm } from '(shared)/components/forms/ArticleControlForm';

export const CreateModal: FC<ModalCommonProps> = ({ isOpen, setIsOpen }) => {
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      {/* <div className=""> */}
      <p className="mb-10 text-center text-ui_bold_32">Створення статті</p>

      <ArticleControlForm type="create" setIsModalOpen={setIsOpen} />

      {/* <button
          type="submit"
          onClick={() => handleArticleDelete(id)}
          disabled={isPending}
          className={classNames(
            'base-button btn-outline !border-red !text-red hocus:!text-white hocus:!bg-red text-ui_reg_20 min-w-[170px] py-5',
            { 'pointer-events-none !border-blue': isPending },
          )}
        >
          {isPending && (
            <ICONS.SPINNER
              size={30}
              className={classNames({
                'animate-spin text-navy-blue pointer-events-none': isPending,
              })}
            />
          )}

          {!isPending && 'Видалити'}
        </button> */}
      {/* </div> */}
    </Modal>
  );
};
