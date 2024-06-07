"use client";

import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { AnimatePresence, motion } from "framer-motion";
import Button from "../Button";
import type { ButtonProps } from "../Button";
import { BsX } from "react-icons/bs";
import { VariantProps, cva } from "class-variance-authority";

type Props = ButtonProps &
  VariantProps<typeof SidebarVariant> & {
    title?: string;
    button: React.ReactNode;
    children: React.ReactNode;
  };

const SidebarVariant = cva(
  "relative mr-auto flex h-full w-full flex-col overflow-y-auto bg-white p-4 shadow-xl",
  {
    variants: {
      sidebarSize: {
        small: "max-w-xs",
        medium: "max-w-md",
        large: "max-w-lg",
        xLarge: " max-w-xl ",
        xxLarge: "max-w-2xl",
      },
    },
    defaultVariants: {
      sidebarSize: "small",
    },
  }
);

const CustomSidebar = ({
  title,
  button,
  children,
  sidebarSize,
  ...props
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button type="button" {...props} onClick={() => setIsOpen(!isOpen)}>
        {button}
      </Button>

      <AnimatePresence>
        {isOpen && (
          <Dialog
            as={motion.div}
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "100%" }}
            exit={{ opacity: 0, width: 0 }}
            static
            className="relative z-[100]"
            onClose={setIsOpen}
            open={isOpen}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50"
            />

            <div className="fixed inset-0 z-40 flex">
              <Dialog.Panel className={SidebarVariant({ sidebarSize })}>
                <div className="flex items-center justify-between pb-4">
                  {title && (
                    <h2 className="text-lg font-medium text-gray-900">
                      {title}
                    </h2>
                  )}
                  <Button
                    type="button"
                    className="-mr-2 ml-auto flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-700"
                    onClick={() => setIsOpen(false)}
                  >
                    <BsX size={24} />
                    <span className="sr-only">Close menu</span>
                  </Button>
                </div>
                {children}
              </Dialog.Panel>
            </div>
          </Dialog>
        )}
      </AnimatePresence>
    </>
  );
};

export default CustomSidebar;
