const Checkbox = ({
  field, // { name, value, onChange, onBlur }
  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}: any) => {
  return (
    <div className="relative mb-2 grid">
      <input
        {...field}
        {...props}
        type="checkbox"
        className="peer absolute  h-full w-full cursor-pointer opacity-0 "
      />
      <label
        htmlFor={props.id}
        className="inline-flex w-full cursor-pointer items-center rounded-md border-2 border-gray-200 bg-white px-4 py-2 text-gray-700 hover:bg-brand-100 hover:text-gray-700 peer-checked:border-brand-500 peer-checked:bg-brand-100 "
      >
        {props.label}
      </label>
      {touched[field.name] && errors[field.name] && (
        <div className="  py-1 pl-2 text-xs  text-red-500">
          {errors[field.name]}
        </div>
      )}
    </div>
  );
};

export default Checkbox;
