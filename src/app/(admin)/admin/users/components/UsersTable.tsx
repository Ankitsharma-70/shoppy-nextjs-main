import type { CartItem, Order, User, WishlistItem } from "@prisma/client";
import Image from "next/image";

import React from "react";

import TableData from "~/components/table/TableData";
import TableHeading from "~/components/table/TableHeading";

import { motion } from "framer-motion";
import { motionContainer, motionItem } from "~/utils/animation";
import Badge from "~/components/Badge";
import { AiOutlineCrown } from "react-icons/ai";
import { priceFormat } from "~/utils/lib";
import { BiRupee } from "react-icons/bi";

const UsersTable = ({
  users,
}: {
  users:
    | (User & {
        cart: CartItem[];
        wishlist: WishlistItem[];
        orders: Order[];
      })[]
    | undefined;
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
          <TableHeading>User Ids</TableHeading>
          <TableHeading>Name</TableHeading>
          <TableHeading>Email</TableHeading>
          <TableHeading>Insights</TableHeading>
        </tr>
      </thead>
      <tbody>
        {users?.map((user) => {
          return (
            <motion.tr
              variants={motionItem}
              key={user.id}
              className="duration-300 ease-in-out even:bg-brand-100/25 hover:bg-brand-100"
            >
              <TableData label={"Order id"}>
                <div>
                  <p className=" text-sm font-light text-gray-900">{user.id}</p>
                </div>
              </TableData>
              <TableData label={"Name"}>
                <div className="inline-flex items-center gap-2 md:flex">
                  <Image
                    src={user.image ?? ""}
                    alt={user.id}
                    width={100}
                    height={100}
                    className=" w-8 rounded-full"
                  />
                  <p className=" inline-flex items-center text-xs text-gray-700">
                    {user.name}
                  </p>
                  {user.isAdmin && (
                    <Badge variant={"brand"} size={"small"}>
                      <AiOutlineCrown />
                      Admin
                    </Badge>
                  )}
                </div>
              </TableData>
              <TableData label={"Email"}>
                <div>
                  <p className=" text-sm font-light text-gray-900">
                    {user.email}
                  </p>
                </div>
              </TableData>
              <TableData label={"Insights"}>
                <div>
                  <p className=" text-xs font-light text-gray-900">
                    Cart Item : {user.cart.length}
                  </p>
                  <p className=" text-xs font-light text-gray-900">
                    Total Order Done :{" "}
                    <span title="Paid Orders">
                      {
                        user.orders.filter(
                          (order) => order.paymentStatus === "completed"
                        ).length
                      }
                    </span>{" "}
                    / {user.orders.length}
                  </p>
                  <p className=" inline-flex items-center text-xs font-light text-gray-900">
                    Total Spent :{" "}
                    <span
                      title="Money paid by User"
                      className="inline-flex items-center"
                    >
                      <BiRupee />
                      {priceFormat(
                        user.orders.reduce(
                          (a, order) =>
                            order.paymentStatus === "completed"
                              ? order.total + a
                              : a,
                          0
                        )
                      )}
                    </span>
                  </p>
                </div>
              </TableData>
            </motion.tr>
          );
        })}
      </tbody>
    </motion.table>
  );
};

export default UsersTable;
