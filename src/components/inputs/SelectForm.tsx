import { useState } from "react";
import { Listbox } from "@headlessui/react";
import { useField } from "formik";

function SelectForm({ label, options, ...props }: any) {
  const [selected, setSelected] = useState({
    label: "Select",
    value: "",
  });
  const [field, meta, helpers] = useField(props);
  const { value } = field;
  const { error, touched } = meta;
  const { setValue } = helpers;
  function handleChange(opt: any) {
    setValue(opt.value);
    setSelected(opt);
  }
  return (
    <Listbox value={selected} onChange={handleChange}>
      <Listbox.Button>{selected?.label || value}</Listbox.Button>
      <Listbox.Options>
        {options?.map((opt: any) => (
          <Listbox.Option
            key={opt.label}
            value={opt}
            disabled={opt.unavailable}
          >
            {opt.label}
          </Listbox.Option>
        ))}
      </Listbox.Options>
      {error && touched && <div className="mt-1 text-red-500">{error}</div>}
    </Listbox>
  );
}

export default SelectForm;
