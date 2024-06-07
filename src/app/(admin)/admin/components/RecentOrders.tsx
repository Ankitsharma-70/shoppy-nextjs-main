"use client";
import type { Order, User } from "@prisma/client";
import { motion } from "framer-motion";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { BsCurrencyRupee } from "react-icons/bs";
import Badge from "~/components/Badge";
import Button from "~/components/Button";
import Loader from "~/components/Loader";
import TimeAgoComponent from "~/components/TimeAgoComponent";
import TableData from "~/components/table/TableData";
import TableHeading from "~/components/table/TableHeading";
import SectionWrapper from "~/components/wrapper/SectionWrapper";
import { motionContainer, motionItem } from "~/utils/animation";
import { api } from "~/utils/api";
import { priceFormat } from "~/utils/lib";

const RecentOrdersTable = ({
  orders,
}: {
  orders: (Order & { User: User })[];
}) => {
  return (
    <motion.table
      variants={motionContainer}
      animate="visible"
      initial="hidden"
      className=" w-full"
    >
      <thead>
        <tr>
          <TableHeading>Order Id</TableHeading>
          <TableHeading>Payment Status</TableHeading>
          <TableHeading>Delivery Status</TableHeading>
          <TableHeading>User</TableHeading>
        </tr>
      </thead>
      <tbody>
        {orders?.map((o) => {
          return (
            <motion.tr
              variants={motionItem}
              key={o.id}
              className=" duration-300 ease-in-out hover:bg-brand-100"
            >
              <TableData label={"Order id"}>
                <div>
                  <p className=" text-xs font-light text-gray-700">
                    Order Id : <span className="text-gray-900">{o.id}</span>
                  </p>
                  <p className=" text-xs font-light text-gray-700">
                    Payment Id :{" "}
                    <span className="text-gray-900">{o.paymentIntentId}</span>
                  </p>
                </div>
              </TableData>
              <TableData label={"Payment Status"}>
                <div className="inline-flex gap-2 md:flex">
                  <p className=" inline-flex items-center text-sm text-gray-700">
                    <BsCurrencyRupee />
                    {priceFormat(o.total)}
                  </p>
                  <Badge
                    variant={
                      o.paymentStatus === "completed"
                        ? "green"
                        : o.paymentStatus === "failed" ||
                          o.paymentStatus === "cancelled"
                        ? "red"
                        : "brand"
                    }
                    size={"small"}
                  >
                    {o.paymentStatus}
                  </Badge>
                </div>
              </TableData>
              <TableData label={"Delivery Status"}>
                <Badge
                  variant={
                    o.deliveryStatus === "shipped" ||
                    o.deliveryStatus === "delivered"
                      ? "green"
                      : o.deliveryStatus === "cancelled"
                      ? "red"
                      : "brand"
                  }
                  size={"small"}
                >
                  {o.deliveryStatus}
                </Badge>
              </TableData>
              <TableData label={"user"}>
                <div className="inline-flex items-center gap-2 md:flex">
                  <Image
                    src={o.User.image ?? ""}
                    alt={o.User.id}
                    width={100}
                    height={100}
                    className=" w-7 rounded-full"
                  />
                  <p className=" text-sm text-gray-700">{o.User.name}</p>
                </div>
              </TableData>
              <TableData label={"user"}>
                <div className="inline-flex items-center gap-2 md:flex">
                  <TimeAgoComponent
                    className=" text-xs text-gray-700"
                    date={o.createdAt}
                  />
                </div>
              </TableData>
              <TableData label={"Product"}>
                <div className="">
                  <ul className="flex -space-x-4 md:mx-auto">
                    {o.products?.slice(0, 3).map((product: any) => {
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
                    {o.products.length > 3 && (
                      <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-gray-600 text-xs font-medium text-white hover:bg-gray-600 ">
                        +{o.products.length - 3}
                      </div>
                    )}
                  </ul>
                </div>
              </TableData>
            </motion.tr>
          );
        })}
      </tbody>
    </motion.table>
  );
};

const RecentOrders = () => {
  const { data: data, isLoading } = api.admin.getAllOrders.useQuery({
    page: 1,
    limit: 5,
    search: "",
  });

  return (
    <SectionWrapper>
      <h2 className=" p-4  text-2xl font-medium text-gray-900 ">
        Recent Orders
      </h2>
      {!data || isLoading ? (
        <Loader />
      ) : (
        <RecentOrdersTable orders={data.orders} />
      )}
      <Button
        href="/admin/orders"
        variant={"tertiary"}
        size={"noStyle"}
        className=" mx-auto my-4  w-full text-xs text-gray-700 duration-300 ease-in-out hover:underline"
      >
        More Orders
      </Button>
    </SectionWrapper>
  );
};

export default RecentOrders;
