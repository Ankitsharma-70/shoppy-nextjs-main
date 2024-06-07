"use client";
import { useSession } from "next-auth/react";
import { BsSuitHeart } from "react-icons/bs";
import Button from "~/components/Button";
import CartDropDown from "./CartDropDown";
import MenuDropDown from "./DropDown";
import AuthModal from "~/components/modals/AuthModal";
import AdminSidebar from "~/components/sidebar/AdminSidebar";

const ClientSideHeader = () => {
  const { data: session, status } = useSession();

  return (
    <>
      {session?.user && status === "authenticated" ? (
        <>
          <Button
            href="/wishlist"
            className=" translate-y-[1px] text-brand-500"
            variant={"tertiary"}
            size={"noStyle"}
          >
            <BsSuitHeart size={24} />
          </Button>
          <CartDropDown />
          <MenuDropDown />
        </>
      ) : (
        <AuthModal />
      )}
      {session?.user.isAdmin && <AdminSidebar />}
    </>
  );
};

export default ClientSideHeader;
