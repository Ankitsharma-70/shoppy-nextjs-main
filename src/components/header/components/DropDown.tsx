"use client";
import { Menu } from "@headlessui/react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { AnimatePresence, motion } from "framer-motion";
import type { IconType } from "react-icons";
import {
  BsPerson,
  BsBag,
  BsTruck,
  BsSuitHeart,
  BsDoorClosed,
} from "react-icons/bs";
import { CgCrown } from "react-icons/cg";

const DropDownLinks = [
  {
    label: "Profile",
    icon: BsPerson,
    href: "/profile",
  },
  {
    label: "Cart",
    icon: BsBag,
    href: "/cart",
  },
  {
    label: "Orders",
    icon: BsTruck,
    href: "/orders",
  },
  {
    label: "Wishlist",
    icon: BsSuitHeart,
    href: "/wishlist",
  },
];

const DropDownItem = ({
  label,
  href = "",
  icon: Icon,
  onChange,
}: {
  label: string;
  href?: string | undefined;
  icon: IconType;
  onChange?: () => void;
}) => {
  const params = usePathname();

  const active = params === href;
  return (
    <Menu.Item as="li">
      <Link
        href={href}
        onClick={onChange}
        className={`group flex w-full items-center justify-between gap-2 overflow-hidden rounded-md p-2 px-4 text-gray-700 hover:bg-brand-100 hover:text-gray-900 ${
          active ? "bg-brand-500 text-white " : null
        }`}
      >
        <Icon
          size={20}
          className={`text-brand-500  ${active ? "text-white" : null} `}
        />
        <p className="text-sm ">{label}</p>
      </Link>
    </Menu.Item>
  );
};

export default function MenuDropDown() {
  const { data: session } = useSession();
  return (
    <Menu as="div" className="relative grid">
      {({ open }) => (
        <>
          <Menu.Button
            as="button"
            className="rounded-md bg-brand-100 p-2 text-sm"
          >
            <div className="relative flex items-center gap-2">
              <Image
                width={25}
                height={25}
                src={session?.user?.image as string}
                alt="user avatar"
                className=" h-7 w-7 rounded-full"
              />

              <p className="hidden pr-2 text-gray-900  md:block">
                {session?.user ? session?.user?.name : "Welcome"}
              </p>
            </div>
          </Menu.Button>
          <AnimatePresence>
            {open && (
              <Menu.Items
                as={motion.nav}
                animate={{ opacity: 1, height: "auto" }}
                initial={{ opacity: 0, height: 0 }}
                exit={{ opacity: 0, height: 0 }}
                transition={{
                  type: "spring",
                }}
                static
                className="absolute right-0 z-20 mt-16 w-52 origin-top-right overflow-hidden rounded-md border border-brand-100 bg-white  text-gray-900 focus:outline-none"
              >
                <ul className="flex flex-col gap-2 p-2  text-gray-900">
                  {DropDownLinks.map((item) => {
                    return (
                      <DropDownItem
                        key={item.href}
                        label={item.label}
                        href={item.href}
                        icon={item.icon}
                      />
                    );
                  })}

                  {/* Some EXTRA BUTTONS  */}

                  {session?.user.isAdmin ? (
                    <DropDownItem label="Admin" icon={CgCrown} href="/admin" />
                  ) : null}

                  <DropDownItem
                    onChange={() => signOut()}
                    label="Logout"
                    icon={BsDoorClosed}
                  />
                </ul>
              </Menu.Items>
            )}
          </AnimatePresence>
        </>
      )}
    </Menu>
  );
}
