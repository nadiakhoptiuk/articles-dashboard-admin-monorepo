import { FC, useTransition } from 'react';
import classNames from 'classnames';

import { Modal } from '(shared)/components/ui-kit/Modal';

import { deleteArticle } from '@/api/serverActions/deleteArticle';
import { notify } from '(shared)/utils/notification';

import { ICONS } from '(shared)/types/icons.types';
import { ModalCommonProps, WithId } from '(shared)/types/common.types';

export const DeleteModal: FC<ModalCommonProps & WithId> = ({
  isOpen,
  setIsOpen,
  id,
}) => {
  const [isPending, startTransition] = useTransition();

  const handleArticleDelete = async (id: string) => {
    startTransition(async () => {
      await deleteArticle(id)
        .then(status => {
          if (status === 200) {
            notify('Видалено успішно!');
          } else {
            notify('Не вдалось видалити');
          }
        })
        .catch(console.log)
        .finally(() => setIsOpen(false));
    });
  };

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className="p-10">
        <p className="mb-10 text-center text-ui_bold_32">
          Ви впевнені, що бажаєте видалити цю статтю?
        </p>

        <ul className="w-fit grid grid-cols-2 gap-x-10 mx-auto">
          <li className="w-fit">
            <button
              type="button"
              className="base-button  text-ui_reg_20 min-w-[170px] py-5"
              onClick={() => setIsOpen(false)}
            >
              Відмінити
            </button>
          </li>

          <li className="w-fit">
            <button
              type="button"
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
                    'animate-spin text-navy-blue pointer-events-none':
                      isPending,
                  })}
                />
              )}

              {!isPending && 'Видалити'}
            </button>
          </li>
        </ul>
      </div>
    </Modal>
  );
};
