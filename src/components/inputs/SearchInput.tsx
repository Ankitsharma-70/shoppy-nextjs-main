import React, { useState } from "react";
import type { InputHTMLAttributes } from "react";
import { BsSearch } from "react-icons/bs";
import Button from "../Button";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  setSearch: (arg: string) => void;
  search: string;
  loading?: boolean;
  disabled?: boolean;
}

const SearchInput = ({
  setSearch,
  search,
  loading = false,
  disabled = false,
  ...props
}: Props) => {
  const [userInput, setUserInput] = useState(search || "");
  const handleSearch = () => {
    setSearch(userInput);
  };
  return (
    <div className="my-6 flex w-full items-center gap-4 ">
      <input
        type="search"
        value={userInput}
        onKeyDown={(e) => {
          if (e.code === "Enter") {
            handleSearch();
          }
        }}
        className="h-full w-full rounded-3xl py-2 px-6 pr-12 shadow-2xl shadow-brand-100/25 ring-1  ring-brand-100/50 placeholder:text-sm placeholder:font-light placeholder:italic  placeholder:text-slate-400 hover:ring-brand-100 focus:outline-transparent  "
        onChange={(e) => setUserInput(e.target.value)}
        {...props}
      />
      <Button
        variant={"tertiary"}
        onClick={handleSearch}
        size={"noStyle"}
        loading={loading ? true : false}
        disabled={disabled}
        title="Search Button"
        className="h-full cursor-pointer  rounded-full bg-brand-300 p-3 text-white duration-300 ease-in-out  hover:stroke-1 hover:text-brand-500"
      >
        <BsSearch size={18} />
      </Button>
    </div>
  );
};

export default SearchInput;
