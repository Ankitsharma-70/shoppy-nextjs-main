const TextInput = ({
  field, // { name, value, onChange, onBlur }
  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  type = "text",
  ...props
}: any) => {
  return (
    <div className="relative mb-2 grid">
      <label
        htmlFor={props.id}
        className="pb-1 text-sm capitalize text-gray-700"
      >
        {props.title}
      </label>
      <input
        type={type}
        {...field}
        {...props}
        className={`w-full rounded-sm  bg-white p-2 text-base font-normal text-gray-900 ring-2 ring-brand-100 placeholder:text-sm placeholder:italic placeholder:text-slate-400  focus:outline-none focus:ring-2 focus:ring-brand-200 `}
      />
      {touched[field.name] && errors[field.name] && (
        <div className="  py-1 pl-2 text-xs  text-red-500">
          {errors[field.name]}
        </div>
      )}
    </div>
  );
};

export default TextInput;
