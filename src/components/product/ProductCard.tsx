"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { BiRupee } from "react-icons/bi";
import { motionItem } from "~/utils/animation";
import { getDiscountPercentage, priceFormat } from "~/utils/lib";
import Badge from "../Badge";
import type { Product } from "@prisma/client";
import { BsCurrencyRupee } from "react-icons/bs";
const ProductCard = ({
  product,
  height = "full",
  width = "full",
  openInNewTab = false,
}: {
  height?: string;
  width?: string;
  product: Product;
  openInNewTab?: boolean;
}) => {
  return (
    <motion.section
      variants={motionItem}
      style={{
        height: height,
        width: width,
      }}
      whileTap={{
        scale: [0.98, 1],
      }}
      transition={{
        type: "spring",
      }}
      className={`group relative flex flex-col overflow-hidden rounded-md bg-white shadow-2xl shadow-brand-100/25 duration-300 ease-linear hover:shadow-2xl hover:shadow-brand-100 `}
    >
      {/* Image  */}
      <Link
        href={`/products/${product?.slug}`}
        target={`${openInNewTab ? "_blank" : "_self"}`}
      >
        {product.images && (
          <Image
            width={300}
            height={300}
            src={product.images[0]?.url || ""}
            alt={product.name}
            className="aspect-[1/1] h-full w-full object-cover duration-300 ease-linear group-hover:opacity-80"
          />
        )}
      </Link>

      {/* Name price  */}
      <Link href={`/products/${product.slug}`} className="grid w-full p-2">
        <p className=" text-xs font-light capitalize text-gray-700 line-clamp-1 md:text-sm">
          {product.brand}
        </p>
        <p className="text-base font-medium capitalize text-gray-900 line-clamp-1 md:text-lg ">
          {product.name}
        </p>
        <div className=" flex w-full flex-wrap  gap-2 ">
          <p className=" flex items-center text-base font-semibold text-brand-500 md:text-xl">
            <BsCurrencyRupee />
            {priceFormat(product.price)}
          </p>
          {product.originalPrice !== product.price && (
            <>
              <Badge
                title={`${getDiscountPercentage({
                  price: product?.price,
                  originalPrice: product?.originalPrice,
                })} % off on this product`}
                variant={"green"}
                size={"medium"}
                className="absolute right-1 top-1 rounded-md"
              >
                -
                {getDiscountPercentage({
                  price: product?.price,
                  originalPrice: product?.originalPrice,
                })}
                %
              </Badge>
              <p className="flex items-center  text-end text-sm font-light capitalize text-gray-900 line-through ">
                <BsCurrencyRupee />
                {priceFormat(product.originalPrice)}
              </p>
            </>
          )}
        </div>
      </Link>
    </motion.section>
  );
};

export default ProductCard;
