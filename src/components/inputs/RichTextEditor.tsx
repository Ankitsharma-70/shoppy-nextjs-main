import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

const RichTextEditor = ({
  value,
  title,
  onChange,
}: {
  value: string;
  title?: string;
  onChange: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <div className=" pb-4">
      {title && (
        <h2 className=" pb-1  text-xs capitalize text-gray-700">{title}</h2>
      )}
      <ReactQuill
        value={value}
        style={{
          height: "300px",
        }}
        onChange={onChange}
        className="bg-white pb-10"
      />
    </div>
  );
};

export default RichTextEditor;
