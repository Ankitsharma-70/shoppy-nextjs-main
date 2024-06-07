import { Popover, Transition } from "@headlessui/react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import React, { Fragment } from "react";
import { BsBag, BsBagX, BsCurrencyRupee } from "react-icons/bs";
import RemoveFromCart from "~/components/product/RemoveFromCart";
import { api } from "~/utils/api";
import { priceFormat } from "~/utils/lib";
import Image from "next/image";
import { motionContainer, motionItem } from "~/utils/animation";
import type { CartItem, Product } from "@prisma/client";
import Button from "~/components/Button";
import { useSession } from "next-auth/react";

const CartDropDown = () => {
  const { data: session } = useSession();
  const { data: cart } = api.cart.get.useQuery(undefined, {
    enabled: session?.user.id ? true : false,
  });

  return (
    <Popover className="relative grid">
      {({ open }) => (
        <>
          <Popover.Button
            as="button"
            aria-roledescription="headlessui-popover-button-:r6:"
            aria-label="Open cart dropdown"
            role={"button"}
            className={`
            ${open ? "scale-90 " : ""}
            group inline-flex h-6 w-6 cursor-pointer focus:outline-none`}
          >
            <BsBag
              className={`h-full w-full text-brand-500 ${
                open ? " scale-80 text-brand-300" : null
              }`}
            />
            {cart?.length ? (
              <motion.span
                initial={{
                  scale: 0,
                  y: -100,
                }}
                animate={{
                  scale: 1,
                  y: 0,
                }}
                className=" absolute left-1 top-[7px] flex  h-4 w-4 items-center justify-center rounded-full text-xs font-semibold text-brand-500"
              >
                {cart?.length}
              </motion.span>
            ) : null}
          </Popover.Button>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute left-0 z-20 mt-10  w-screen max-w-sm   -translate-x-3/4 px-4">
              <div className="overflow-hidden rounded-lg shadow-2xl shadow-gray-100 ring-1  ring-black ring-opacity-5">
                {cart?.length ? (
                  <CartList cart={cart} />
                ) : (
                  <div className=" flex flex-col items-center justify-center  gap-2 bg-white py-4 ">
                    <p className=" text-base font-medium text-gray-900 ">
                      Cart is Empty
                    </p>
                  </div>
                )}

                <div className="bg-brand-100 p-4 ">
                  <Button
                    href={"/cart"}
                    aria-label="navigate to cart page"
                    variant={"primary"}
                    size={"large"}
                    className="w-full shadow-lg shadow-brand-500/25 "
                  >
                    <p>Check Out page</p>
                  </Button>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};

export default CartDropDown;

const CartList = ({
  cart,
}: {
  cart: (CartItem & {
    product: Product;
  })[];
}) => {
  return (
    <motion.ul
      variants={motionContainer}
      initial="hidden"
      animate="visible"
      className="flex max-h-[15rem] flex-col gap-2 overflow-auto  bg-white pb-6 "
    >
      <AnimatePresence>
        {cart?.map((item) => {
          return (
            <motion.li
              variants={motionItem}
              exit={{
                opacity: 0,
                scale: 0,
              }}
              key={item.id}
              className="group grid w-full grid-cols-[1fr_50px] items-center p-4 transition-all duration-300 ease-in-out hover:bg-brand-100"
            >
              <Link
                href={`/product/${item.product.slug}`}
                className="flex w-full items-center"
              >
                <Image
                  width={50}
                  height={50}
                  src={item?.product?.images[0]?.url || ""}
                  alt={item.product.name}
                  className="  aspect-square h-full max-w-[50px] overflow-hidden  rounded-md  object-cover"
                />
                <div className="flex flex-col justify-between px-4 ">
                  <p className=" text-sm font-medium capitalize text-gray-900 line-clamp-2   ">
                    {item.product.name}
                  </p>
                  <p className=" flex items-center text-base font-semibold  text-brand-500   ">
                    <BsCurrencyRupee />
                    {priceFormat(item?.product?.price * item?.quantity)}
                    <span className=" pl-4 text-sm  font-normal text-gray-700 group-hover:text-gray-800">
                      Qt {item?.quantity}
                    </span>
                  </p>
                </div>
              </Link>

              <RemoveFromCart cartItemId={item.id}>
                <BsBagX size={20} className=" text-red-500" />
              </RemoveFromCart>
            </motion.li>
          );
        })}
      </AnimatePresence>
    </motion.ul>
  );
};
