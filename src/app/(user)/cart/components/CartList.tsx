"use client";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import RemoveFromCart from "~/components/product/RemoveFromCart";
import { motionContainer, motionItem } from "~/utils/animation";
import { priceFormat } from "~/utils/lib";
import ProductSelectCart from "./ProductSelectCart";
import MoveToWishlist from "./MoveToWishlist";

import type { CartItem, Product } from "@prisma/client";
import { BsBagX, BsCurrencyRupee } from "react-icons/bs";

const CartItem = ({
  cartItem,
}: {
  cartItem: CartItem & {
    product: Product;
  };
}) => {
  return (
    <motion.li
      key={cartItem?.id}
      exit={{
        opacity: 0,
      }}
      className={"grid rounded-md bg-white  p-2 shadow-2xl shadow-brand-100/25"}
      variants={motionItem}
    >
      <div className="  grid grid-cols-[auto_1fr]  justify-between">
        <Link href={`/product/${cartItem.product.slug}`}>
          <Image
            width={100}
            height={100}
            src={cartItem?.product?.images[0]?.url || ""}
            alt={cartItem?.product.name}
            className="aspect-square w-full max-w-[6rem] rounded-md object-cover object-center"
          />
        </Link>
        <div className=" flex flex-col justify-between py-2 pl-4">
          <div className=" flex justify-between">
            <div className=" flex flex-col ">
              <Link href={`/product/${cartItem.product.slug}`}>
                <p className=" text-xs capitalize text-gray-700 line-clamp-1   md:text-sm ">
                  {cartItem.product.brand}
                </p>
                <p className=" text-sm font-medium capitalize text-gray-900  line-clamp-2  md:text-base ">
                  {cartItem.product.name}
                </p>
              </Link>
            </div>
            <div className="flex flex-col items-end justify-center pr-2">
              <p className="flex  items-center  text-lg font-semibold text-brand-500  md:text-xl ">
                <BsCurrencyRupee size={20} />
                {priceFormat(cartItem.product.price * cartItem.quantity)}
              </p>
              <p className=" flex items-center text-xs   text-gray-700 ">
                <BsCurrencyRupee size={14} />
                {priceFormat(cartItem.product.price)}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <ProductSelectCart product={cartItem.product} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-[30%_1fr] items-center justify-center pt-4 pb-2 md:grid-cols-2">
        <RemoveFromCart
          cartItemId={cartItem?.id}
          className="group gap-4 text-sm text-gray-700  hover:text-red-600"
        >
          <p className=" hidden md:block">Remove</p>
          <BsBagX size={18} />
        </RemoveFromCart>
        <MoveToWishlist
          productId={cartItem.product.id}
          cartItemId={cartItem.id}
        />
      </div>
    </motion.li>
  );
};

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
      transition={{
        type: "tween",
      }}
      className=" flex  h-full  max-h-[40dvh] w-full flex-col gap-12 overflow-auto  overflow-x-hidden  px-4 pb-16 md:max-h-[80dvh] md:px-8"
    >
      <AnimatePresence>
        {cart?.map((cartItem) => {
          return <CartItem cartItem={cartItem} key={cartItem.id} />;
        })}
      </AnimatePresence>
    </motion.ul>
  );
};

export default CartList;
