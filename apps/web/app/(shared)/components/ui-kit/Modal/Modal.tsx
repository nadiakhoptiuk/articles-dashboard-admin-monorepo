import { FC, Fragment } from 'react';
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from '@headlessui/react';
import classNames from 'classnames';

import {
  ModalCommonProps,
  WithChildren,
  WithClassName,
} from '(shared)/types/common.types';
import { ICONS } from '(shared)/types/icons.types';

export const Modal: FC<ModalCommonProps & WithChildren & WithClassName> = ({
  isOpen,
  setIsOpen,
  children,
  className = '',
}) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        onClose={() => setIsOpen(false)}
        className="relative z-10"
      >
        <TransitionChild
          as={Fragment}
          enter="transition duration-300 ease-out"
          enterFrom="transform scale-100 opacity-0"
          enterTo="transform scale-100 opacity-100"
          leave="transition duration-300 ease-out"
          leaveFrom="transform scale-100 opacity-100"
          leaveTo="transform scale-100 opacity-0"
        >
          <div className="fixed inset-0 bottom-0 left-0 right-0 top-0 bg-black/25 backdrop-blur-sm" />
        </TransitionChild>

        <div className="fixed inset-0 bottom-0 left-0 right-0 top-0 z-30 h-full w-full overflow-y-hidden bg-[rgba(0,0,0,0.5)]">
          <TransitionChild
            as={Fragment}
            enter="transition duration-300 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-300 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <DialogPanel
              className={classNames(
                'absolute left-1/2 top-1/2 w-full max-w-[85%] -translate-x-1/2 -translate-y-1/2 space-y-4 border max-xl:px-5 py-12 xl:px-12 rounded-lg base-shadow bg-light',
                className,
              )}
            >
              {children}
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Закрити модальне вікно"
                className="absolute top-5 right-5 flex h-[50px] w-[50px] items-center justify-center hocus:text-navy-blue text-black !m-0 base-transition"
              >
                <ICONS.CLOSE size={30} />
              </button>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  );
};
