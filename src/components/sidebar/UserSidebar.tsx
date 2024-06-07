"use client";
import React from "react";
import CustomSidebar from "../ui/CustomSidebar";
import { BsJustify } from "react-icons/bs";
import Button from "../Button";

const UserSidebar = () => {
  return (
    <CustomSidebar
      button={<BsJustify size={24} />}
      title="Admin Menu"
      variant={"tertiary"}
      size={"noStyle"}
    >
      <ul className="space-y-2  pt-10">
        <li>
          <Button
            href="/admin"
            size={"large"}
            className=" w-full"
            variant={"primary"}
          >
            Dashboard
          </Button>
        </li>
        <li>
          <Button
            href="/admin/products/list"
            className=""
            variant={"tertiary"}
            size={"large"}
          >
            List Product
          </Button>
        </li>
        <li>
          <Button
            href="/admin/categories"
            className=""
            variant={"tertiary"}
            size={"large"}
          >
            List Category
          </Button>
        </li>
        <li>
          <Button
            href="/admin/products"
            className=""
            size={"large"}
            variant={"tertiary"}
          >
            Products
          </Button>
        </li>
        <li>
          <Button
            href="/admin/users"
            className=""
            size={"large"}
            variant={"tertiary"}
          >
            Users
          </Button>
        </li>
        <li>
          <Button
            href="/admin/orders"
            className=""
            size={"large"}
            variant={"tertiary"}
          >
            Orders
          </Button>
        </li>
        <li>
          <Button
            href="/admin/coupons"
            size={"large"}
            className=""
            variant={"tertiary"}
          >
            Coupons
          </Button>
        </li>
      </ul>
    </CustomSidebar>
  );
};

export default UserSidebar;
