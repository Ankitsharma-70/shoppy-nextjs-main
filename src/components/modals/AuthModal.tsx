import { signIn } from "next-auth/react";
import React from "react";
import Modal from "./Modal";
import { FcGoogle } from "react-icons/fc";
import PageHeading from "../PageHeading";
import Button from "../Button";
import { BsPerson } from "react-icons/bs";
const AuthModal = () => {
  const trigger = (
    <>
      <BsPerson /> Login
    </>
  );

  const bodyContent = (
    <>
      <PageHeading title="Welcome" subtitle="Login into your Account" />
      <Button
        variant={"secondary"}
        size={"large"}
        className=" w-full"
        onClick={() => signIn("google")}
      >
        <FcGoogle size={24} />
        <p className=" text-sm font-medium text-brand-500">
          Sign in with Google
        </p>
      </Button>
    </>
  );
  return (
    <>
      <Modal
        trigger={trigger}
        triggerVariant={"tertiary"}
        className=" rounded-md bg-brand-100 p-2 px-4"
        bodyContent={bodyContent}
      />
    </>
  );
};

export default AuthModal;
