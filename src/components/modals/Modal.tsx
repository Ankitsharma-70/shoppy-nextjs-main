"use client";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, ReactNode, useState } from "react";
import Button from "../Button";
import { cva } from "class-variance-authority";

const modalClasses = cva(
  "h-full w-full transform items-center  gap-4 rounded-md bg-white p-4 text-left align-middle transition-all",
  {
    variants: {
      size: {
        small: " max-w-sm",
        medium: "max-w-md",
        large: "max-w-lg",
        xLarge: "max-w-2xl",
        xxLarge: "max-w-3xl",
      },
    },
    defaultVariants: {
      size: "small",
    },
  }
);

const Modal = ({
  trigger,
  triggerVariant,
  triggerSize,
  bodyContent,
  wider,
  wide,
  className,
  size,
}: {
  trigger: ReactNode;
  triggerVariant?: "primary" | "secondary" | "tertiary" | null | undefined;
  triggerSize?: "small" | "medium" | "large" | "noStyle" | null | undefined;
  bodyContent: ReactNode;
  wider?: boolean;
  wide?: boolean;
  className?: string;
  size?: any;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }
  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <Button
        type="button"
        onClick={openModal}
        variant={triggerVariant}
        size={triggerSize}
        className={className}
      >
        {trigger}
      </Button>
      {isOpen && (
        <Transition appear show={isOpen} as={Fragment}>
          <Dialog as="div" className="relative z-[100]" onClose={closeModal}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-dark-500 bg-opacity-25 backdrop-blur-[2px] " />
            </Transition.Child>

            <div className="fixed inset-0  overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className={modalClasses({ size })}>
                    {bodyContent}
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      )}
    </>
  );
};
export default Modal;
