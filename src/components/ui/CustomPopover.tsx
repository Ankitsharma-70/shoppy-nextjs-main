"use client";
import React, { ButtonHTMLAttributes } from "react";
import { Popover } from "@headlessui/react";
import { AnimatePresence, motion } from "framer-motion";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  title?: string;
  button: React.ReactNode;
  children: React.ReactNode;
  popOverClasses?: string;
};

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const CustomPopover = ({
  title,
  button,
  popOverClasses = "",
  children,
  ...props
}: Props) => {
  return (
    <Popover key={title} className={popOverClasses}>
      {({ open }) => (
        <>
          <Popover.Button {...props}>{button}</Popover.Button>

          <AnimatePresence mode="wait">
            {open && (
              <Popover.Panel
                as={motion.div}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{
                  type: "spring",
                }}
                static
                className="absolute inset-x-0 top-20 flex h-full w-full flex-col overflow-hidden bg-white text-sm"
              >
                {children}
              </Popover.Panel>
            )}
          </AnimatePresence>
        </>
      )}
    </Popover>
  );
};

export default CustomPopover;
