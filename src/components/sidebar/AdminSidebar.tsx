import React from "react";
import CustomSidebar from "../ui/CustomSidebar";
import {
  BsColumnsGap,
  BsJustify,
  BsPeople,
  BsPlus,
  BsTicket,
  BsTruck,
  BsUiRadiosGrid,
} from "react-icons/bs";
import Button from "../Button";
import { usePathname } from "next/navigation";

const AdminSidebar = () => {
  const path = usePathname();
  return (
    <CustomSidebar
      button={<BsJustify size={24} />}
      title="Admin Menu"
      variant={"tertiary"}
      size={"noStyle"}
    >
      <ul className="space-y-2">
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
            variant={"tertiary"}
            size={"large"}
            className={`${
              path === "/admin/products/list" ? "text-brand-600 " : null
            } `}
          >
            <BsPlus />
            List Product
          </Button>
        </li>
        <li>
          <Button
            href="/admin/categories"
            variant={"tertiary"}
            size={"large"}
            className={`${
              path === "/admin/categories" ? "text-brand-600 " : null
            } `}
          >
            <BsUiRadiosGrid />
            List Category
          </Button>
        </li>
        <li>
          <Button
            href="/admin/products"
            className={`${
              path === "/admin/products" ? "text-brand-600 " : null
            } `}
            size={"large"}
            variant={"tertiary"}
          >
            <BsColumnsGap />
            Products
          </Button>
        </li>
        <li>
          <Button
            href="/admin/users"
            className={`${path === "/admin/users" ? "text-brand-600 " : null} `}
            size={"large"}
            variant={"tertiary"}
          >
            <BsPeople />
            Users
          </Button>
        </li>
        <li>
          <Button
            href="/admin/orders"
            className={`${
              path === "/admin/orders" ? "text-brand-600 " : null
            } `}
            size={"large"}
            variant={"tertiary"}
          >
            <BsTruck />
            Orders
          </Button>
        </li>
        <li>
          <Button
            href="/admin/coupons"
            size={"large"}
            className={`${
              path === "/admin/coupons" ? "text-brand-600 " : null
            } `}
            variant={"tertiary"}
          >
            <BsTicket />
            Coupons
          </Button>
        </li>
      </ul>
    </CustomSidebar>
  );
};

export default AdminSidebar;
