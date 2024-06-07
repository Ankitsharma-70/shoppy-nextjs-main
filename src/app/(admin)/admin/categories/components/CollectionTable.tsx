"use client";

import React from "react";
import TableData from "~/components/table/TableData";
import TableHeading from "~/components/table/TableHeading";
import { motion } from "framer-motion";
import { motionContainer, motionItem } from "~/utils/animation";
import { api } from "~/utils/api";
import Modal from "~/components/modals/Modal";
import UpdateCollectionForm from "./forms/UpdateCollectionForm";
import Button from "~/components/Button";
import { toast } from "react-hot-toast";
import { BsPencilSquare, BsXLg } from "react-icons/bs";
import Badge from "~/components/Badge";
import Link from "next/link";
import CustomSidebar from "~/components/ui/CustomSidebar";

const CollectionTable = () => {
  const { data: collections } = api.collection.getAll.useQuery(undefined);

  return (
    <motion.table
      variants={motionContainer}
      animate="visible"
      initial="hidden"
      className=" w-full"
    >
      <thead>
        <tr>
          <TableHeading>Collections</TableHeading>
          <TableHeading centerText>Action</TableHeading>
        </tr>
      </thead>
      <tbody>
        {collections?.map((collection) => {
          return (
            <motion.tr
              variants={motionItem}
              key={collection.id}
              className="duration-300 ease-in-out even:bg-brand-100/25 hover:bg-brand-100"
            >
              <TableData label={"Name"}>
                <div className=" flex flex-col items-end gap-2 md:items-start">
                  <h2 className=" text-base font-medium capitalize text-gray-900 md:text-2xl">
                    {collection.name}
                  </h2>
                  <span className=" text-sm text-brand-500">
                    Contain {collection.products.length} Products
                  </span>
                  <ul>
                    {collection.products.map((p) => {
                      return (
                        <li key={p.id}>
                          <Link href={`/products/${p.slug}`} target="_blank">
                            <Badge variant={"brand"} size={"small"}>
                              {p.name}
                            </Badge>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </TableData>
              <TableData label={"Action"}>
                <div className=" flex items-center justify-end gap-4 md:justify-center">
                  <CustomSidebar
                    button={
                      <>
                        <BsPencilSquare />
                      </>
                    }
                    title="Update Collection"
                    variant={"tertiary"}
                    size={"noStyle"}
                    sidebarSize="xxLarge"
                  >
                    <UpdateCollectionForm collection={collection} />
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

export default CollectionTable;
