"use client";
import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { api } from "~/utils/api";
import { useSession } from "next-auth/react";
import type { CartItem, Product } from "@prisma/client";
import AddToWishlistButton from "./AddToWishlistButton";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { motionContainer, motionItem } from "~/utils/animation";
import Button from "~/components/Button";
import { BsBagCheck, BsPlus, BsDash } from "react-icons/bs";
import { AddProductToCartValidation } from "~/utils/FormValidation";

interface Values {
  quantity?: number;
  size?: string;
}

const ProductAddToCart = ({ product }: { product: Product }) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  //Query which only run when user is logged in
  const { data: cart } = api.cart.get.useQuery(undefined, {
    enabled: session?.user.id && status === "authenticated" ? true : false,
  });
  console.log(cart);

  //Handle the Add to cart and update cart Api endpoint in trpc
  const ctx = api.useContext();
  const addToCart = api.cart.add.useMutation({
    onSuccess: (r) => {
      toast.success(`${r.message}`);
      void ctx.cart.get.invalidate();
    },
    onError: (e) => {
      toast.error(`${e.message}`);
    },
  });

  //Get all the size options
  const sizeOptions = useMemo(
    () =>
      product.sizes.map((size) => ({
        name: size.title,
        value: size.title,
        quantity: size.quantity,
        disable: size.quantity === 0,
      })),
    [product]
  );

  //   If user is not logged in than this will not work
  const inCart = useMemo(
    () => cart?.find((item: CartItem) => item?.productId === product.id),
    [cart, product.id]
  );

  //When user click it will add product into cart
  const handleAddToCart = useCallback(
    async (values: Values) => {
      void addToCart.mutate({
        productId: product.id,
        size: values.size!,
        quantity: values.quantity as number,
      });
    },
    [product.id, addToCart]
  );

  return (
    <>
      <Formik
        initialValues={{
          quantity: inCart ? inCart.quantity : 1,
          size: inCart ? inCart.size : undefined,
        }}
        validationSchema={AddProductToCartValidation}
        onSubmit={(values: Values) => {
          //If product already in cart with same quantity and size use router and send user to cart page else add to cart
          if (
            inCart?.quantity === values.quantity &&
            inCart?.size === values.size
          ) {
            router.push("/cart");
          } else {
            handleAddToCart(values);
          }
        }}
      >
        {({ values, setFieldValue }) => (
          <Form className="relative mx-auto grid w-full gap-6">
            <p className="text-sm font-medium text-gray-900">Select Size</p>
            <motion.ul
              variants={motionContainer}
              initial="hidden"
              animate="visible"
              className="flex w-full flex-wrap  gap-4"
            >
              {sizeOptions.map((size, i) => {
                return (
                  <motion.li
                    variants={motionItem}
                    key={size.value}
                    className="relative"
                  >
                    <Field
                      type="radio"
                      name="size"
                      id={`size-${i}`}
                      value={size.value}
                      className="peer absolute h-full w-full cursor-pointer opacity-0 focus:outline-transparent"
                      disabled={size.disable || !product.isInStock}
                    />
                    <label
                      htmlFor={`size-${i}`}
                      className="grid w-full cursor-pointer items-center justify-center rounded-md bg-white px-4  py-2.5 text-gray-700 ring-1 ring-brand-100 peer-checked:bg-brand-100 peer-checked:font-semibold peer-checked:text-brand-600 peer-checked:ring-brand-500  peer-hover:text-gray-900  peer-hover:ring-1 peer-hover:ring-brand-500   peer-disabled:bg-light-500 peer-disabled:line-through"
                    >
                      <p className="uppercase">{size.name}</p>
                    </label>
                  </motion.li>
                );
              })}
            </motion.ul>

            <div className="-top-5 flex items-center gap-2">
              <p className="text-sm  font-medium text-red-600">
                <ErrorMessage name="size" />
              </p>
              <p className="text-sm font-medium text-red-600">
                <ErrorMessage name="quantity" className="" />
              </p>
            </div>

            <div className=" fixed bottom-0 left-0 z-10  grid w-full grid-cols-2  gap-6 bg-white p-4 md:static md:grid-cols-[30%_1fr] md:bg-transparent md:p-0">
              <div className=" flex items-center justify-around  rounded-md bg-brand-100 px-4">
                <Button
                  disabled={!product.isInStock}
                  type="button"
                  variant={"tertiary"}
                  size={"noStyle"}
                  onClick={() => setFieldValue("quantity", values.quantity + 1)}
                >
                  <BsPlus size={24} className=" stroke-1 text-brand-500" />
                </Button>
                <Field
                  name="quantity"
                  type="number"
                  min={1}
                  disabled={!product.isInStock}
                  max={
                    sizeOptions?.find((size) => size.value === values.size)
                      ?.quantity || 10
                  }
                  className="flex w-full min-w-[20px] items-center rounded-md bg-transparent py-2 text-center text-lg font-medium focus:outline-none"
                />
                <Button
                  type="button"
                  variant={"tertiary"}
                  size={"noStyle"}
                  disabled={!product.isInStock}
                  onClick={() =>
                    setFieldValue("quantity", Math.max(values.quantity - 1, 1))
                  }
                >
                  <BsDash size={24} className=" stroke-1 text-brand-500" />
                </Button>
              </div>

              {!product.isInStock ? (
                <p className=" flex h-full w-full items-center justify-center rounded-md  bg-red-100 px-4 py-1 text-center text-red-600">
                  Out of stock
                </p>
              ) : (
                <Button
                  loading={addToCart.isLoading}
                  disabled={addToCart.isLoading}
                  type={"submit"}
                  variant={"primary"}
                  size={"large"}
                >
                  {inCart?.quantity === values.quantity &&
                  inCart.size === values.size ? (
                    <p className=" flex w-full items-center  gap-1">
                      <BsBagCheck size={20} className=" hidden md:block" />
                      <span className=" flex-1">View Cart</span>
                    </p>
                  ) : (
                    "Add to Cart"
                  )}
                </Button>
              )}
            </div>
            <AddToWishlistButton productId={product.id} />
          </Form>
        )}
      </Formik>
    </>
  );
};

export default ProductAddToCart;
