"use client";
import React from "react";
import { Disclosure } from "@headlessui/react";
import { BsDash, BsPlus } from "react-icons/bs";
import { AnimatePresence, motion } from "framer-motion";

const CustomDisclosure = ({
  trigger,
  children,
  defaultOpen = false,
  indicator = false,
}: any) => {
  return (
    <Disclosure
      as="div"
      className={" grid gap-6  border-brand-100 py-2.5 even:border-y "}
      defaultOpen={defaultOpen}
    >
      {({ open }) => (
        <>
          <h3 className="flow-root ">
            <Disclosure.Button className="flex w-full items-center justify-between text-sm text-gray-700 hover:text-gray-900">
              {trigger}
              <span className="ml-6 flex items-center gap-2">
                {indicator && (
                  <div className=" h-3 w-3 rounded-full bg-green-400" />
                )}
                {open ? (
                  <BsDash className="h-5 w-5" aria-hidden="true" />
                ) : (
                  <BsPlus className="h-5 w-5" aria-hidden="true" />
                )}
              </span>
            </Disclosure.Button>
          </h3>
          <AnimatePresence>
            {open && (
              <Disclosure.Panel
                as={motion.div}
                animate={{ opacity: 1, height: "auto" }}
                initial={{ opacity: 0, height: 0 }}
                exit={{ opacity: 0, height: 0 }}
                static
                className="overflow-hidden pl-2"
              >
                {children}
              </Disclosure.Panel>
            )}
          </AnimatePresence>
        </>
      )}
    </Disclosure>
  );
};

export default CustomDisclosure;
