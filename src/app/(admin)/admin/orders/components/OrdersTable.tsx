import type { Order, User } from "@prisma/client";
import Image from "next/image";
import React from "react";
import { BiRupee } from "react-icons/bi";
import Badge from "~/components/Badge";
import TableData from "~/components/table/TableData";
import TableHeading from "~/components/table/TableHeading";
import { priceFormat } from "~/utils/lib";
import { motion } from "framer-motion";
import { motionContainer, motionItem } from "~/utils/animation";
import Modal from "~/components/modals/Modal";
import { BsPencilSquare } from "react-icons/bs";
import UpdateOrderForm from "./UpdateOrderForm";
import CustomSidebar from "~/components/ui/CustomSidebar";

const OrdersTable = ({
  orders,
}: {
  orders: (Order & {
    User: User;
  })[];
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
          <TableHeading>Order Ids</TableHeading>
          <TableHeading>Payment Status</TableHeading>
          <TableHeading>Delivery Status</TableHeading>
          <TableHeading>User</TableHeading>
          <TableHeading centerText>Action</TableHeading>
        </tr>
      </thead>
      <tbody>
        {orders?.map((o) => {
          return (
            <motion.tr
              variants={motionItem}
              key={o.id}
              className=" duration-300 ease-in-out even:bg-brand-100/25 hover:bg-brand-100"
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
                    <BiRupee />
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
                    className=" w-10 rounded-full"
                  />
                  <div>
                    <p className=" text-xs text-gray-700">{o.User.name}</p>
                    <p className=" text-xs text-gray-700">{o.User.email}</p>
                  </div>
                </div>
              </TableData>
              <TableData label={"Action"}>
                <div className="flex justify-end md:justify-center">
                  <CustomSidebar
                    title="Update Order Details"
                    button={<BsPencilSquare />}
                    sidebarSize={"xxLarge"}
                  >
                    <UpdateOrderForm order={o} />
                  </CustomSidebar>
                </div>
              </TableData>
            </motion.tr>
          );
        })}
      </tbody>
    </motion.table>
  );
};

export default OrdersTable;
