import React from "react";
import { PageWrapper } from "~/components/wrapper/PageWrapper";
import Button from "~/components/Button";
const EmptyCart = () => {
  return (
    <PageWrapper className=" flex flex-col items-center justify-center gap-4">
      <div className=" text-center">
        <h2 className=" text-4xl font-medium text-gray-900">Empty Cart</h2>
        <p className=" font-light text-gray-700">
          Add some product into your cart!!
        </p>
      </div>
      <Button href="/products" variant={"primary"} size={"large"}>
        Shop Now!
      </Button>
    </PageWrapper>
  );
};

export default EmptyCart;
