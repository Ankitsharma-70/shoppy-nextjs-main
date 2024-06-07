"use client";
import { Disclosure } from "@headlessui/react";
import { BsChevronDown } from "react-icons/bs";

export default function DisclosureV1({
  title,
  content,
  defaultOpen = false,
}: {
  title: string;
  content: string;
  defaultOpen?: boolean;
}) {
  return (
    <>
      <Disclosure as={"div"} defaultOpen={defaultOpen}>
        {({ open }) => (
          <>
            <Disclosure.Button className="flex w-full items-center justify-between rounded-md bg-white px-4 py-2.5 text-left text-sm font-medium text-gray-900 ring-1 ring-brand-100  focus:outline-none focus-visible:ring focus-visible:ring-brand-500 focus-visible:ring-opacity-75">
              <span>{title}</span>
              <BsChevronDown
                size={18}
                className={`${
                  open ? "rotate-180 transform" : ""
                } text-brand-500`}
              />
            </Disclosure.Button>
            <Disclosure.Panel
              as="div"
              dangerouslySetInnerHTML={{ __html: content }}
              className="mt-2 rounded-md bg-white p-4 text-sm text-gray-700 ring-1 ring-brand-100"
            ></Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </>
  );
}
