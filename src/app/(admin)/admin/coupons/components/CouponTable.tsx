import type { Coupon, User } from "@prisma/client";
import React from "react";
import TableData from "~/components/table/TableData";
import TableHeading from "~/components/table/TableHeading";
import { motion } from "framer-motion";
import { motionContainer, motionItem } from "~/utils/animation";
import TimeAgoComponent from "~/components/TimeAgoComponent";
import Badge from "~/components/Badge";
import Modal from "~/components/modals/Modal";
import { BsDiagram3, BsPencilSquare } from "react-icons/bs";
import UpdateCouponForm from "./UpdateCouponForm";
import CustomSidebar from "~/components/ui/CustomSidebar";

const CouponTable = ({
  coupons,
}: {
  coupons: (Coupon & { users: User[] })[];
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
          <TableHeading>Code</TableHeading>
          <TableHeading>Usage</TableHeading>
          <TableHeading>Discount</TableHeading>
          <TableHeading>Minimum Order</TableHeading>
          <TableHeading>Expiry</TableHeading>
          <TableHeading centerText>Action</TableHeading>
        </tr>
      </thead>
      <tbody>
        {coupons?.map((coupon) => {
          return (
            <motion.tr
              variants={motionItem}
              key={coupon.id}
              className="duration-300 ease-in-out even:bg-brand-100/25 hover:bg-brand-100"
            >
              <TableData label={"Code"}>
                <div className="inline-flex items-center gap-2 md:flex">
                  <p className=" text-sm  capitalize text-gray-800">
                    {coupon.code}
                  </p>
                  {coupon.oneTime && (
                    <Badge size={"small"} variant={"green"}>
                      One time
                    </Badge>
                  )}
                </div>
              </TableData>
              <TableData label={"Usage"}>
                <div className="inline-flex items-center gap-2 md:flex">
                  <p className=" text-sm font-light text-gray-700">
                    {coupon.usageCount}/{coupon.usageLimit}
                  </p>
                </div>
              </TableData>
              <TableData label={"Discount"}>
                <div className="inline-flex items-center gap-2 md:flex">
                  <p className="text-sm font-light text-gray-700">
                    {coupon.discount}
                  </p>
                  <Badge variant={"brand"} size={"small"}>
                    {coupon.type}
                  </Badge>
                </div>
              </TableData>
              <TableData label={"Minimum Order"}>
                <div>
                  <p className=" text-sm font-light text-gray-700">
                    {coupon.minimumOrderAmount}
                  </p>
                </div>
              </TableData>
              <TableData label={"Expiry"}>
                <p className=" text-sm font-light text-gray-700">
                  <TimeAgoComponent date={coupon.expiry} />
                </p>
              </TableData>
              <TableData label={"Action"}>
                <div className="flex justify-end md:justify-center">
                  <CustomSidebar
                    button={
                      <>
                        <BsPencilSquare />
                      </>
                    }
                    title="Update Coupon"
                    sidebarSize="xxLarge"
                  >
                    <UpdateCouponForm coupon={coupon} />
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

export default CouponTable;
