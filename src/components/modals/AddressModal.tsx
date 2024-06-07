import React from "react";
import Modal from "./Modal";
import PageHeading from "../PageHeading";
import AddressForm from "~/app/(user)/profile/components/AddressFrom";
import { BsTruck } from "react-icons/bs";

const AddressModal = () => {
  const trigger = (
    <>
      <BsTruck />
      Add Address
    </>
  );
  const bodyContent = (
    <>
      <PageHeading
        title="Add New Address"
        subtitle="Address where we ship your orders"
      />
      <AddressForm />
    </>
  );
  return (
    <Modal
      className="w-full text-gray-700 hover:text-brand-500 "
      trigger={trigger}
      triggerSize={"medium"}
      triggerVariant={"secondary"}
      bodyContent={bodyContent}
    />
  );
};

export default AddressModal;
