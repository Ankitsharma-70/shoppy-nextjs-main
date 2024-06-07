import { Listbox, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { BiCheck, BiChevronDown } from "react-icons/bi";

type option = {
  title: string;
  desc?: string;
  value: string | number | undefined;
  disable?: boolean;
};

export default function SelectForCartCard({
  selected = {
    title: "",
    value: undefined,
  },
  options,
  onChange,
  title,
  disabled,
}: any) {
  const handleSelected = (selected: option) => {
    onChange(selected);
  };

  return (
    <Listbox
      value={selected}
      onChange={handleSelected}
      name={title}
      as={"div"}
      disabled={disabled}
    >
      <div className="h-full w-fit cursor-pointer">
        <Listbox.Button
          className={`relative flex w-full cursor-pointer  items-center rounded-md bg-brand-100/50 px-2  py-[2px] pr-5  text-left capitalize text-gray-700 hover:bg-brand-100 sm:text-sm ${
            disabled ? " bg-dark-100 line-through" : null
          }`}
        >
          {title && (
            <Listbox.Label className="pr-1 text-sm">{title} :</Listbox.Label>
          )}
          <span className="block truncate font-semibold text-gray-900">
            {selected?.title}
          </span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-1">
            <BiChevronDown
              size={18}
              className="pl-1 text-brand-500 "
              aria-hidden="true"
            />
          </span>
        </Listbox.Button>
        <Transition as="div">
          <Transition.Child as="div">
            <div className=" fixed inset-0 z-[200]  h-full  w-full  bg-brand-100 bg-opacity-25 backdrop-blur-sm " />
          </Transition.Child>
          <Listbox.Options
            as="ul"
            className="fixed inset-0 z-[200] my-auto mx-auto  flex h-fit  max-h-80 w-full max-w-[10rem] flex-col gap-2 overflow-auto rounded-sm bg-white text-base shadow-2xl focus:outline-none sm:text-sm"
          >
            {title && (
              <p className=" p-2 px-4 text-center text-base font-semibold capitalize text-gray-900 ">
                {title}
              </p>
            )}

            {options?.map((option: option, optionIdx: number) => (
              <Listbox.Option
                key={optionIdx}
                className={`relative cursor-pointer select-none py-2 px-4
                    ${
                      option?.disable
                        ? "  cursor-not-allowed text-red-500 line-through"
                        : "text-gray-700 "
                    } `}
                as={"li"}
                disabled={option?.disable ? option.disable : false}
                value={option}
              >
                {({ selected }) => (
                  <>
                    <span
                      className={`flex items-center justify-center gap-4 truncate text-base capitalize ${
                        selected
                          ? "font-semibold text-brand-500"
                          : "font-semibold"
                      }`}
                    >
                      {option.title}
                    </span>
                    {selected ? (
                      <span className="absolute inset-y-0 right-2 flex items-center text-amber-600">
                        <BiCheck
                          size={24}
                          className=" text-brand-500"
                          aria-hidden="true"
                        />
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
}
