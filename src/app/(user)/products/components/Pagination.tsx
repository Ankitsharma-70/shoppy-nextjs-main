"use client";
import React from "react";
import { BsArrowLeftShort, BsArrowRightShort } from "react-icons/bs";
import Button from "~/components/Button";
const Pagination = ({
  next,
  page,
  setPage,
}: {
  next: boolean;
  page: number;
  setPage: (page: number) => void;
}) => {
  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };
  const handleNextPage = () => {
    if (next) {
      setPage(page + 1);
    }
  };
  if (!next && page === 1) {
    return null;
  }
  return (
    <div className=" flex w-full items-center justify-center gap-6 py-4">
      {page > 1 && (
        <Button
          variant={"secondary"}
          size={"medium"}
          className="bg-white"
          onClick={() => handlePrevPage()}
        >
          <BsArrowLeftShort /> Previous
        </Button>
      )}
      {next && (
        <Button
          variant={"secondary"}
          size={"medium"}
          className="bg-white"
          onClick={() => handleNextPage()}
        >
          <BsArrowRightShort /> Next
        </Button>
      )}
    </div>
  );
};

export default Pagination;
