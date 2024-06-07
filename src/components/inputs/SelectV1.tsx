import { ErrorMessage, Field } from "formik";
import React from "react";
import { FiChevronDown } from "react-icons/fi";

const SelectV1 = ({
  options,
  title,
  name,
  defaultOptionTitle = "Select One",
}: any) => {
  return (
    <div className="relative pb-2">
      <div className="relative grid">
        <label
          htmlFor={name}
          className=" pb-1  text-xs capitalize text-gray-700 "
        >
          {title}
        </label>
        <Field
          as="select"
          name={name}
          className={`w-full rounded-md bg-white py-2 pl-4 text-sm font-normal capitalize text-gray-900  ring-1 ring-brand-100 placeholder:text-sm placeholder:italic placeholder:text-slate-400  hover:ring-1 hover:ring-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500`}
        >
          <option selected disabled value="">
            {defaultOptionTitle}
          </option>
          {options?.map((option: any) => {
            return (
              <option
                className=" capitalize"
                key={option.value}
                value={option.value}
              >
                {option.name}
              </option>
            );
          })}
        </Field>
        <FiChevronDown
          size={20}
          className="  absolute inset-y-0 -bottom-5  right-2 z-50 my-auto  text-brand-500 transition-all duration-300 ease-in-out group-hover:text-brand-500"
        />
      </div>
      <ErrorMessage name={name}>
        {(msg) => (
          <div className="  py-1 pl-2 text-xs  text-red-500">{msg}</div>
        )}
      </ErrorMessage>
    </div>
  );
};

export default SelectV1;
