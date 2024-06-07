import React from "react";
import { MoonLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className=" flex h-full items-center justify-center py-6 ">
      <MoonLoader size={24} color="#7a4ce6" />
    </div>
  );
};

export default Loader;
