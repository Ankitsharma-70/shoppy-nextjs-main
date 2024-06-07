"use client";
import type { Product } from "@prisma/client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { motionContainer, motionItem } from "~/utils/animation";
import { api } from "~/utils/api";
import { motion } from "framer-motion";
import RemoveFromWishlist from "./RemoveFromWishlist";
import { getDiscountPercentage, priceFormat } from "~/utils/lib";
import Badge from "~/components/Badge";
import { BsCurrencyRupee } from "react-icons/bs";
import NoDataFound from "~/components/ui/NoDataFound";
const WishlistProductList = () => {
  const { data: session } = useSession();
  const { data: wishlist } = api.wishlist.get.useQuery(undefined, {
    enabled: session?.user ? true : false,
  });

  if (wishlist?.length === 0) {
    return (
      <NoDataFound
        title="No Wishlist Items"
        subtitle="Check out products and add them to your wishlist"
      />
    );
  }

  return (
    <motion.ul
      variants={motionContainer}
      initial="hidden"
      animate="visible"
      transition={{
        type: "tween",
      }}
      className=" grid w-full gap-6 md:grid-cols-2 "
    >
      {wishlist?.map((item) => {
        return <WishlistItem key={item.id} product={item.product} />;
      })}
    </motion.ul>
  );
};

export default WishlistProductList;

const WishlistItem = ({ product }: { product: Product }) => {
  return (
    <motion.li
      key={product.id}
      exit={{
        opacity: 0,
      }}
      transition={{
        type: "tween",
      }}
      whileHover={{
        scale: 1.01,
      }}
      className={
        "relative grid grid-cols-[1fr_auto] rounded-md bg-white  p-2 shadow-2xl shadow-brand-100/25  hover:shadow-brand-100"
      }
      variants={motionItem}
    >
      <Link
        href={`/product/${product.slug}`}
        className=" grid grid-cols-[auto_1fr] gap-4"
        title={"Open in new tab"}
        target={"_blank"}
      >
        <Image
          width={100}
          height={100}
          src={product?.images[0]?.url || ""}
          alt={product.name}
          className="my-auto aspect-square w-full max-w-[5rem] rounded-md object-cover object-center"
        />

        <div className=" grid gap-1">
          <p className=" text-xs font-light capitalize text-gray-700  line-clamp-1  md:text-sm ">
            {product.brand}
          </p>
          <p className=" text-sm font-semibold capitalize text-gray-900  line-clamp-2  md:text-base ">
            {product.name}
          </p>
          <div className=" flex items-center gap-2 text-sm  font-medium  capitalize  text-gray-900 md:text-base">
            {product.originalPrice !== product.price ? (
              <>
                <p className=" flex items-center  pr-2 text-sm font-semibold text-brand-500 md:text-base">
                  <BsCurrencyRupee />
                  {priceFormat(product.price)}
                </p>
                <p className="flex items-center  text-end text-xs font-light capitalize text-gray-900 line-through">
                  <BsCurrencyRupee className="  text-xs text-gray-700" />
                  {priceFormat(product.originalPrice)}
                </p>
              </>
            ) : (
              <>
                <p className=" flex items-center  pr-2 text-sm font-medium text-brand-500 md:text-lg">
                  <BsCurrencyRupee />
                  {priceFormat(product.price)}
                </p>
              </>
            )}
          </div>
          {product.originalPrice !== product.price && (
            <Badge
              variant={"green"}
              size={"medium"}
              className=" absolute left-2 top-2 rounded-md"
            >
              {getDiscountPercentage({
                price: product?.price,
                originalPrice: product?.originalPrice,
              })}
              %
            </Badge>
          )}
          <Badge variant={product.inStock ? "green" : "red"} size={"small"}>
            {product.inStock ? "In stock" : "Out of stock"}
          </Badge>
        </div>
      </Link>
      <RemoveFromWishlist productId={product.id} />
    </motion.li>
  );
};
