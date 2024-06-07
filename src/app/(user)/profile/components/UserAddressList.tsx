"use client";
import { Address } from "@prisma/client";
import { AnimatePresence, motion } from "framer-motion";
import { useSession } from "next-auth/react";
import React from "react";
import Button from "~/components/Button";
import { motionContainer, motionItem } from "~/utils/animation";
import { api } from "~/utils/api";

const PrefixSuffixText = ({
  prefix,
  suffix,
}: {
  prefix: string;
  suffix: string | number | any;
}) => {
  return (
    <p className=" flex w-full items-center gap-2 ">
      <span className="text-xs text-gray-700">{prefix}</span>
      {suffix ? (
        <span className=" break-all text-sm text-gray-900">{suffix}</span>
      ) : (
        "---"
      )}
    </p>
  );
};

const AddressItem = ({ address }: { address: Address }) => {
  const ctx = api.useContext();
  const deleteAddress = api.address.delete.useMutation({
    onSuccess: () => {
      ctx.address.getAll.invalidate();
    },
  });
  const handleAddressDelete = (id: string) => {
    deleteAddress.mutateAsync({
      id: id,
    });
  };
  return (
    <motion.li
      exit={{
        opacity: 0,
      }}
      transition={{
        type: "tween",
      }}
      className=" grid w-full grid-cols-[1fr_auto] items-start rounded-md bg-white p-4 capitalize shadow-2xl shadow-brand-100/25 "
      variants={motionItem}
    >
      <div className="grid gap-1">
        <PrefixSuffixText prefix="Name" suffix={address.name} />
        <PrefixSuffixText prefix="Email" suffix={address.email} />
        <PrefixSuffixText prefix="Mobile" suffix={address.mobile} />
        <PrefixSuffixText prefix="Address Line 1" suffix={address.address1} />
        <PrefixSuffixText prefix="Address Line 2" suffix={address.address2} />
        <PrefixSuffixText prefix="City" suffix={address.city} />
        <PrefixSuffixText prefix="State" suffix={address.state} />
      </div>

      <div className=" flex  h-full items-end gap-2">
        <Button className="px-2 py-1 text-xs text-gray-700 transition-all duration-300 ease-in-out hover:bg-green-500 hover:text-white">
          Edit
        </Button>
        <Button
          loading={deleteAddress.isLoading}
          disabled={deleteAddress.isLoading}
          className="px-2 py-1 text-xs text-gray-700 transition-all duration-300 ease-in-out hover:bg-red-500 hover:text-white"
          onClick={() => handleAddressDelete(address.id)}
        >
          Delete
        </Button>
      </div>
    </motion.li>
  );
};
const UserAddressList = () => {
  const { data: session } = useSession();

  const { data: addresses } = api.address.getAll.useQuery(undefined, {
    enabled: session?.user ? true : false,
  });

  return (
    <motion.ul
      variants={motionContainer}
      initial="hidden"
      animate="visible"
      className=" grid gap-6 lg:grid-cols-2"
    >
      <AnimatePresence>
        {addresses?.map((address: Address) => {
          return <AddressItem address={address} key={address.id} />;
        })}
      </AnimatePresence>
    </motion.ul>
  );
};

export default UserAddressList;
