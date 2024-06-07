"use client";
import type { CartItem, Product } from "@prisma/client";
import type { ReduxState } from "~/redux/store";

import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { Form, Formik } from "formik";
import { useSelector } from "react-redux";

import { api } from "~/utils/api";
import { toast } from "react-hot-toast";
import SelectV1 from "~/components/inputs/SelectV1";
import CouponCodeInput from "./checkout/CouponCodeInput";
import CartSubTotal from "./checkout/CartSubTotal";
import AddressModal from "~/components/modals/AddressModal";
import Button from "~/components/Button";

const checkoutFormValidation = Yup.object().shape({
  addressId: Yup.string().required("Required"),
});

const Checkout = ({
  cart,
}: {
  cart: (CartItem & {
    product: Product;
  })[];
}) => {
  const ctx = api.useContext();
  const router = useRouter();
  const { data: addresses } = api.address.getAll.useQuery();
  const { coupon } = useSelector((state: ReduxState) => state.cart);

  const createOrder = api.checkout.createOrder.useMutation({
    onSuccess: (r) => {
      if ("orderId" in r) {
        toast.success(`${r.message}`);
      } else {
        toast.error(`${r.message}`);
      }
    },
    onError: (e) => {
      toast.error(`${e.message}`);
    },
  });

  const verifyOrder = api.checkout.verifyOrder.useMutation({
    //Api generated error or success message
    onSuccess: (res) => {
      if ("orderId" in res) {
        toast.success(`${res.message}`);
        ctx.cart.get.invalidate();
        router.push(`/orders/${res.orderId}`);
      } else {
        toast.error(`${res.message}`);
      }
    },
    //Client error
    onError: (e) => {
      toast.error(`${e.message}`);
      router.push("/");
    },
  });
  const orderFailed = api.checkout.orderFailed.useMutation();

  const handlePaymentFailed = ({
    orderId,
    rzpOrderId,
  }: {
    orderId: string;
    rzpOrderId: string;
  }) => {
    orderFailed.mutateAsync({
      id: orderId,
    });
  };

  const handlePaymentCancel = ({
    orderId,
    rzpOrderId,
  }: {
    orderId: string;
    rzpOrderId: string;
  }) => {
    orderFailed.mutateAsync({
      id: orderId,
    });
  };
  const handlePaymentSuccess = (res: any) => {
    verifyOrder.mutateAsync({
      razorpay_order_id: res.razorpay_order_id,
      razorpay_payment_id: res.razorpay_payment_id,
      razorpay_signature: res.razorpay_signature,
    });
  };
  const handleCheckout = async ({ values }: { values: any }) => {
    try {
      const res: any = await createOrder.mutateAsync({
        addressId: values.addressId,
        couponCode: coupon ? coupon.code : undefined,
      });

      if (res?.data) {
        const rzpOrderId = res.data.id; // Rzp Order id
        const orderId = res.data.orderId; // Database order id req if order is cancelled
        const options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY, // Enter the Key ID generated from the Dashboard
          currency: "INR",
          name: "Shoppy",
          description: "Trying to loot you",
          image: "/assets/logo/brandlogo.svg",
          order_id: rzpOrderId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
          // callback_url: `/api/payment/verify`,
          handler: handlePaymentSuccess,
          theme: {
            color: "#7367f0",
            hide_topbar: true,
            backdrop_color: "rgba(227, 225, 252,0.5)",
          },

          modal: {
            escape: false,
            confirm_close: true,
            ondismiss: () => handlePaymentCancel({ orderId, rzpOrderId }),
          },
        };
        const rzp1 = new window.Razorpay(options);
        rzp1.open();

        rzp1.on("payment.failed", function (response: any) {
          handlePaymentFailed({ orderId, rzpOrderId });
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="grid h-fit min-w-[250px] gap-4 rounded-md bg-white p-4  shadow-2xl  shadow-brand-100/25">
      <CartSubTotal cart={cart} />
      <CouponCodeInput />
      <Formik
        initialValues={{
          addressId: undefined,
        }}
        validationSchema={checkoutFormValidation}
        onSubmit={(values) => {
          handleCheckout({ values });
        }}
      >
        <Form className=" mx-auto grid w-full max-w-xl">
          {addresses?.length === 0 ? (
            <AddressModal />
          ) : (
            <SelectV1
              name="addressId"
              title="Select Address"
              defaultOptionTitle="Select One of your Address"
              options={addresses?.map((address) => {
                return {
                  name: address.name,
                  value: address.id,
                };
              })}
            />
          )}

          <Button
            loading={createOrder.isLoading || verifyOrder.isLoading}
            disabled={createOrder.isLoading || verifyOrder.isLoading}
            type={"submit"}
            variant={"primary"}
            size={"large"}
            className=" mt-4"
          >
            Check Out
          </Button>
        </Form>
      </Formik>
    </div>
  );
};

export default Checkout;
