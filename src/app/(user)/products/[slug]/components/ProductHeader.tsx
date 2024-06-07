"use client";
import { motion } from "framer-motion";
import { BsCurrencyRupee } from "react-icons/bs";
import Badge from "~/components/Badge";
import { motionContainer, motionItem } from "~/utils/animation";
import type { RouterOutputs } from "~/utils/api";
import { getDiscountPercentage, priceFormat } from "~/utils/lib";

type Product = RouterOutputs["product"]["getAll"][0];
const ProductHeader = ({ product }: { product: Product }) => {
  return (
    <motion.div
      variants={motionContainer}
      initial="hidden"
      animate="visible"
      className="flex flex-row gap-6 md:flex-col"
    >
      {/* Name and brand name  */}
      <div className="w-full">
        <motion.h2
          variants={motionItem}
          className=" text-sm font-light capitalize  text-gray-700 line-clamp-2 md:pb-2 md:text-base"
        >
          {product.brand}
        </motion.h2>
        <motion.p
          variants={motionItem}
          className="text-base font-semibold  capitalize  text-gray-900 line-clamp-3 md:text-3xl "
        >
          {product.name}
        </motion.p>
      </div>
      {/* Price and discount  */}
      <div className=" flex w-full flex-col items-end md:items-start md:py-2">
        <div className=" flex items-center gap-1">
          <motion.p
            variants={motionItem}
            className="flex items-center text-2xl font-semibold text-brand-500 md:text-3xl "
          >
            <BsCurrencyRupee size={24} />
            {priceFormat(product.price)}
          </motion.p>
          {product.price !== product.originalPrice && (
            <motion.p
              variants={motionItem}
              className="flex items-center text-sm  capitalize text-gray-700 line-through "
            >
              <BsCurrencyRupee size={16} />
              {priceFormat(product.originalPrice)}
            </motion.p>
          )}
        </div>
        <div className="flex items-center gap-2  pt-2 md:pt-4 ">
          {!product.isInStock ? (
            <Badge variant={"red"} size={"small"} className="hidden md:block">
              Out of Stock
            </Badge>
          ) : (
            <Badge
              variant={"green"}
              size={"small"}
              className="hidden font-medium md:block"
            >
              In Stock
            </Badge>
          )}
          {product?.price !== product?.originalPrice &&
            product.originalPrice && (
              <Badge variant={"green"} size={"small"}>
                {getDiscountPercentage({
                  price: product?.price,
                  originalPrice: product?.originalPrice,
                })}
                {" % off "}
              </Badge>
            )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProductHeader;
