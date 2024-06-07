import React from "react";
import { PuffLoader } from "react-spinners";

const loading = () => {
  return (
    <div className=" flex h-full flex-1 items-center justify-center ">
      <PuffLoader size={24} color="red" />
    </div>
  );
};

export default loading;
