"use client";
import { Disclosure } from "@headlessui/react";
import { BsDash, BsPlus } from "react-icons/bs";

export default function HtmlRenderDisclosure({
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
              {open ? (
                <BsDash className="h-5 w-5" aria-hidden="true" />
              ) : (
                <BsPlus className="h-5 w-5" aria-hidden="true" />
              )}
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
