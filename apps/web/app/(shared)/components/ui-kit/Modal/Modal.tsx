import { FC, Fragment } from 'react';
import classNames from 'classnames';
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from '@headlessui/react';

import { ModalCommonProps, WithChildren } from '(shared)/types/common.types';

export const Modal: FC<ModalCommonProps & WithChildren> = ({
  isOpen,
  setIsOpen,
  children,
}) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        open={isOpen}
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
            <DialogPanel className="absolute left-1/2 top-1/2 w-[1280px] -translate-x-1/2 -translate-y-1/2 space-y-4 border p-12 rounded-lg base-shadow bg-light">
              {children}
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  );
};
