"use client";
import React, { useContext, useEffect, useRef } from "react";
import Button from "./Button";
import { AppContext } from "./context/AppContext";
import { useSession } from "next-auth/react";
import Badge from "./Badge";
import { CgCrown } from "react-icons/cg";

const AdminSideBar = () => {
  const { data: session } = useSession();

  const appContext = useContext(AppContext);
  const drawerRef = useRef<HTMLDivElement>(null);
  const handleDrawer = () => {
    if (!drawerRef.current) return;
    if (appContext?.isAdminMenuOpen) {
      drawerRef.current.classList.remove("-translate-x-full");
    } else {
      drawerRef.current.classList.add("-translate-x-full");
    }
  };
  useEffect(() => {
    handleDrawer();
  }, [appContext?.isAdminMenuOpen]);
  if (!session?.user.isAdmin) {
    return null;
  }

  return (
    <>
      {appContext?.isAdminMenuOpen && (
        <div
          className=" fixed z-[99] h-screen w-[100vw] bg-brand-100/50"
          onClick={() =>
            appContext?.setIsAdminMenuOpen(!appContext.isAdminMenuOpen)
          }
        />
      )}
      <div
        ref={drawerRef}
        className="fixed top-0 left-0 z-[100] h-screen w-72 -translate-x-full  overflow-y-auto bg-white p-4 transition-transform"
        aria-labelledby="drawer-navigation-label"
      >
        <Badge variant={"brand"} size={"medium"}>
          <CgCrown size={24} />
          Admin Menu
        </Badge>
        <button
          type="button"
          onClick={() =>
            appContext?.setIsAdminMenuOpen(!appContext.isAdminMenuOpen)
          }
          data-drawer-hide="drawer-navigation"
          aria-controls="drawer-navigation"
          className="absolute top-2.5 right-2.5 inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
        >
          <svg
            aria-hidden="true"
            className="h-5 w-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
          <span className="sr-only">Close menu</span>
        </button>
        <div className="overflow-y-auto py-4">
          <ul className="space-y-2 ">
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
        </div>
      </div>
    </>
  );
};

export default AdminSideBar;
