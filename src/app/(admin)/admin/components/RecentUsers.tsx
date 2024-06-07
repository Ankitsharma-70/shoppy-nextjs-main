"use client";
import type { CartItem, Order, User, WishlistItem } from "@prisma/client";
import { motion } from "framer-motion";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import TimeAgoComponent from "~/components/TimeAgoComponent";
import { motionContainer, motionItem } from "~/utils/animation";
import { api } from "~/utils/api";

const RecentUsers = () => {
  const { data: data, isLoading } = api.admin.getAllUsers.useQuery({
    page: 1,
    limit: 3,
    search: "",
  });

  return (
    <motion.ul
      variants={motionContainer}
      initial="hidden"
      animate="visible"
      className="grid h-full gap-4"
    >
      {data?.users?.map((user) => {
        return (
          <motion.li
            variants={motionItem}
            key={user.id}
            className="flex items-center gap-4 rounded-full bg-white bg-opacity-50 p-2 pr-6"
          >
            <Image
              src={user.image ?? ""}
              width={50}
              height={50}
              alt={user.name ?? ""}
              className=" w-8 rounded-full"
            />
            <div className="flex w-full flex-1 flex-wrap items-center justify-between gap-1">
              <p className=" text-sm text-gray-900">{user.name}</p>
              {user.createdAt && (
                <TimeAgoComponent
                  className=" text-xs text-gray-700 "
                  date={user.createdAt}
                />
              )}
            </div>
          </motion.li>
        );
      })}
    </motion.ul>
  );
};

export default RecentUsers;
