import React from "react";
import { ProductsFilter } from "./ProductsFilter";
import { BsFunnel } from "react-icons/bs";
import CustomSidebar from "~/components/ui/CustomSidebar";

const MobileFilter = () => {
  return (
    <div className=" fixed inset-x-0 bottom-0 z-50 mx-auto grid w-full  items-center bg-white py-4 md:hidden">
      <CustomSidebar
        title="Filter"
        button={
          <p className="  flex  items-center gap-1 text-sm text-gray-700 hover:text-brand-500">
            <BsFunnel size={16} /> Filter
          </p>
        }
      >
        <ProductsFilter />
      </CustomSidebar>
    </div>
  );
};

export default MobileFilter;
