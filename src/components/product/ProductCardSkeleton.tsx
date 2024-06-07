import React from "react";

const ProductCardSkeleton = ({ height = "full", width = "full" }) => {
  return (
    <section
      style={{
        height: height,
        width: width,
      }}
      className={` group relative flex flex-col overflow-hidden rounded-md bg-white shadow-2xl shadow-brand-100/25`}
    >
      <div className="aspect-[1/1/5] h-full w-full animate-pulse  bg-slate-200 object-cover" />
      <div className=" flex w-full flex-1 flex-col justify-between">
        <div className=" my-4 mx-auto h-4 w-[90%] animate-pulse rounded-full bg-slate-200 " />
        <div className="mx-auto mb-4 h-4 w-[50%] animate-pulse rounded-full bg-slate-200  " />
      </div>
    </section>
  );
};

export default ProductCardSkeleton;
