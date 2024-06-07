"use client";
import CartList from "./components/CartList";
import Checkout from "./components/Checkout";
import { PageWrapper } from "~/components/wrapper/PageWrapper";
import Script from "next/script";
import { api } from "~/utils/api";
import { useSession } from "next-auth/react";
import EmptyCart from "./components/EmptyCart";

const CartPage = () => {
  const { data: session } = useSession();
  const { data: cart } = api.cart.get.useQuery(undefined, {
    enabled: session?.user ? true : false,
  });
  if (!cart || cart?.length === 0) {
    return <EmptyCart />;
  }
  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      <PageWrapper className=" mx-auto grid w-full max-w-7xl grid-rows-[1fr_auto] gap-6 md:grid-cols-[1fr_minmax(350px,25%)]">
        <CartList cart={cart} />
        <Checkout cart={cart} />
      </PageWrapper>
    </>
  );
};

export default CartPage;
