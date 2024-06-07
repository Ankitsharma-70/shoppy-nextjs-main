import React from "react";
import Button from "./Button";
import { BsArrowRight } from "react-icons/bs";

const Banner = () => {
  return (
    <div className=" flex h-10 w-full items-center justify-center gap-6 bg-brand-500 text-sm font-medium text-white">
      <h2>New Products in Town 🌍</h2>{" "}
      <Button
        href="/products"
        className=" rounded-full bg-white px-4 py-1 font-light text-brand-500"
      >
        Explore <BsArrowRight />
      </Button>
    </div>
  );
};

export default Banner;
