"use client";
import React from "react";
import { motionContainer, motionItem } from "~/utils/animation";
import { api } from "~/utils/api";
import { motion } from "framer-motion";
import type { Order } from "@prisma/client";
import TimeAgoComponent from "~/components/TimeAgoComponent";
import { priceFormat } from "~/utils/lib";
import Image from "next/image";
import Link from "next/link";
import Badge from "~/components/Badge";
import { BsCurrencyRupee, BsTruck } from "react-icons/bs";
const OrderListItem = ({ order }: { order: Order }) => {
  return (
    <motion.li
      exit={{
        opacity: 0,
      }}
      transition={{
        type: "tween",
      }}
      whileHover={{
        scale: 1.01,
      }}
      className=" w-full cursor-pointer items-start  rounded-md bg-white p-4 capitalize shadow-2xl shadow-brand-100/25  hover:shadow-brand-100 "
      variants={motionItem}
    >
      <Link href={`/orders/${order.id}`} className=" grid gap-2">
        <div className=" grid w-full grid-cols-[1fr_auto]   ">
          <p className=" text-sm  text-gray-700 ">
            Order Id :{" "}
            <span className="text-gray-900">{order.id.slice(0, 6)}...</span>
          </p>
          <p className=" inline-flex gap-1 text-sm  text-gray-700 ">
            Total :{" "}
            <span className=" inline-flex items-center font-semibold text-brand-500">
              <BsCurrencyRupee size={16} /> {priceFormat(order.total)}
            </span>
          </p>
        </div>
        <div className=" flex items-center justify-between pt-2">
          <div className=" flex items-center gap-1">
            <ul className="flex -space-x-4">
              {order.products?.slice(0, 3).map((product: any) => {
                return (
                  <Image
                    src={product.image}
                    alt={product.name}
                    height={100}
                    width={100}
                    key={product.id}
                    className=" h-8 w-8 rounded-full border-2 border-white object-cover "
                  />
                );
              })}
              {order.products.length > 3 && (
                <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-gray-600 text-xs font-medium text-white hover:bg-gray-600 ">
                  +{order.products.length - 3}
                </div>
              )}
            </ul>
          </div>
          <TimeAgoComponent
            className="text-xs text-gray-700"
            date={order.createdAt}
          />
        </div>
        <div className=" flex gap-4 ">
          <Badge
            title="Payment Status"
            variant={
              order.paymentStatus === "completed"
                ? "green"
                : order.paymentStatus === "failed" ||
                  order.paymentStatus === "cancelled"
                ? "red"
                : "brand"
            }
            size={"small"}
          >
            <BsCurrencyRupee size={16} /> {order.paymentStatus}
          </Badge>
          <Badge
            title="Delivery Status"
            variant={
              order.deliveryStatus === "shipped" ||
              order.deliveryStatus === "delivered"
                ? "green"
                : order.deliveryStatus === "cancelled"
                ? "red"
                : "brand"
            }
            size={"small"}
          >
            <BsTruck size={16} />
            {order.deliveryStatus}
          </Badge>
        </div>
      </Link>
    </motion.li>
  );
};

const OrderList = ({ orders }: { orders: Order[] }) => {
  return (
    <motion.ul
      variants={motionContainer}
      initial="hidden"
      animate="visible"
      className=" grid gap-6 lg:grid-cols-2"
    >
      {orders?.map((order) => {
        return <OrderListItem key={order.id} order={order} />;
      })}
    </motion.ul>
  );
};

export default OrderList;
