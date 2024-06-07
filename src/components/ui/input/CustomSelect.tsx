import { ErrorMessage, FieldProps } from "formik";
import React, { useEffect } from "react";
import Select, { GroupBase, OptionsOrGroups } from "react-select";

interface Option {
  label: string;
  value: string;
}

interface CustomSelectProps extends FieldProps {
  options: Option[];
  isMulti?: boolean;
  className?: string;
  placeholder?: string;
  title: string;
}

export const CustomSelect = ({
  className,
  placeholder,
  field,
  form,
  options,
  title,
  isMulti = false,
}: CustomSelectProps) => {
  const onChange = (option: Option[] | unknown) => {
    form.setFieldValue(
      field.name,
      isMulti
        ? (option as Option[]).map((item: Option) => item.value)
        : (option as Option).value
    );
  };

  const getValue = () => {
    if (options) {
      return isMulti
        ? options.filter(
            (option: Option) => field.value.indexOf(option.value) >= 0
          )
        : options.find((option: Option) => option.value === field.value);
    } else {
      return isMulti ? [] : ("" as any);
    }
  };

  return (
    <div>
      <label
        htmlFor={field.name}
        className="pb-1 text-sm capitalize text-gray-700"
      >
        {title}
      </label>
      <Select
        className="react-select"
        classNamePrefix={"react-select"}
        name={field.name}
        id={field.name}
        value={getValue()}
        onChange={onChange}
        placeholder={placeholder}
        options={options}
        isMulti={isMulti}
        isSearchable={false}
      />
      <ErrorMessage name={field.name}>
        {(msg) => (
          <div className="  py-1 pl-2 text-xs  text-red-500">{msg}</div>
        )}
      </ErrorMessage>
    </div>
  );
};

export default CustomSelect;
