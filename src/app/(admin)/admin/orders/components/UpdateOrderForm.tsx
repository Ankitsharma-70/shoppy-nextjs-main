"use client";
import { Order, Prisma, deliveryStatus, paymentStatus } from "@prisma/client";
import { Formik, Field, Form } from "formik";
import Image from "next/image";
import Link from "next/link";

import { toast } from "react-hot-toast";
import { BsCurrencyRupee } from "react-icons/bs";
import Badge from "~/components/Badge";
import Button from "~/components/Button";
import PageHeading from "~/components/PageHeading";

import SelectV1 from "~/components/inputs/SelectV1";
import TextInput from "~/components/inputs/TextInput";
import { api } from "~/utils/api";
interface Values {
  customerId: string;
  paymentIntentId: string;
  paymentMethod: string;
  userId: string;
  subTotal: number;
  total: number;
  paymentStatus: paymentStatus;
  deliveryStatus: deliveryStatus;
  trackingId: string;
  trackingLink: string;
  couponCode?: string;
}
const UpdateOrderForm = ({ order }: { order: Order }) => {
  const ctx = api.useContext();
  const updateOrder = api.order.update.useMutation({
    onSuccess: () => {
      toast.success("Updated");
      ctx.admin.getAllOrders.invalidate();
    },
  });

  const deleteOrder = api.order.delete.useMutation({
    onSuccess: () => {
      toast.success("Deleted");
      ctx.admin.getAllOrders.invalidate();
    },
  });

  return (
    <>
      <Formik
        initialValues={{
          customerId: order.customerId,
          paymentIntentId: order.paymentIntentId,
          paymentMethod: order.paymentMethod,
          userId: order.userId,
          subTotal: order.subTotal,
          total: order.total,
          paymentStatus: order.paymentStatus,
          deliveryStatus: order.deliveryStatus,
          trackingId: order.trackingId,
          trackingLink: order.trackingLink,
          couponCode: order.couponCode || "",
        }}
        onSubmit={(values: Values) => {
          void updateOrder.mutateAsync({
            id: order.id,
            couponCode: values.couponCode,
            deliveryStatus: values.deliveryStatus,
            paymentStatus: values.paymentStatus,
            trackingId: values.trackingId,
            trackingLink: values.trackingLink,
            subTotal: values.subTotal,
            total: values.total,
            customerId: values.customerId,
            paymentIntentId: values.paymentIntentId,
            paymentMethod: values.paymentMethod,
          });
        }}
      >
        {({ values }) => (
          <Form className="grid w-full gap-4">
            <div className="grid gap-2">
              <h2 className=" inline-flex items-center gap-2">
                Payment Status :{" "}
                <Badge
                  variant={
                    order.paymentStatus === "completed"
                      ? "green"
                      : order.paymentStatus === "failed" ||
                        order.paymentStatus === "cancelled"
                      ? "red"
                      : "brand"
                  }
                  size={"small"}
                >
                  {order.paymentStatus}
                </Badge>
              </h2>
              <h2 className=" inline-flex items-center gap-2">
                Delivery Status :{" "}
                <Badge
                  variant={
                    order.deliveryStatus === "shipped" ||
                    order.deliveryStatus === "delivered"
                      ? "green"
                      : order.deliveryStatus === "cancelled"
                      ? "red"
                      : "brand"
                  }
                  size={"small"}
                >
                  {order.deliveryStatus}
                </Badge>
              </h2>
            </div>

            <Field
              component={TextInput}
              title="customerId"
              name="customerId"
              placeholder="customerId"
            />
            <Field
              component={TextInput}
              title="Payment Intent Id"
              name="paymentIntentId"
              placeholder="Payment Intent Id"
            />
            <Field
              component={TextInput}
              title="Payment Method"
              name="paymentMethod"
              placeholder="paymentMethod"
            />

            <div className=" grid gap-4 md:grid-cols-2">
              <SelectV1
                title="Select Delivery Status"
                name="deliveryStatus"
                options={Object.entries(deliveryStatus).map((s) => {
                  return {
                    value: s[0],
                    name: s[0],
                  };
                })}
              />
              <SelectV1
                title="Select Payment Status"
                name="paymentStatus"
                options={Object.entries(paymentStatus).map((s) => {
                  return {
                    value: s[0],
                    name: s[0],
                  };
                })}
              />
            </div>
            {values.deliveryStatus === "delivered" ||
            values.deliveryStatus === "processing" ||
            values.deliveryStatus === "shipped" ? (
              <div className=" grid gap-4 md:grid-cols-2">
                <Field
                  component={TextInput}
                  title="Tracking Id"
                  name="trackingId"
                  placeholder="Tracking Id"
                />
                <Field
                  component={TextInput}
                  title="Tracking Link"
                  name="trackingLink"
                  placeholder="Tracking Link"
                />
              </div>
            ) : null}
            <div className="grid grid-cols-1 items-center gap-4 md:grid-cols-3">
              <Field
                component={TextInput}
                title="subTotal"
                name="subTotal"
                type="number"
                placeholder="subTotal"
              />
              <Field
                component={TextInput}
                title="total"
                type="number"
                name="total"
                placeholder="total"
              />
              <Field
                component={TextInput}
                title="Coupon Code"
                name="couponCode"
                placeholder="coupon Code"
              />
            </div>

            <ul className=" grid auto-cols-[minmax(300px,400px)] grid-flow-col  gap-6 overflow-auto">
              {order?.products?.map((product: any) => {
                if (!product) {
                  return null;
                }
                return (
                  <li
                    className=" flex gap-6 rounded-md bg-brand-100/50  p-2 shadow-2xl shadow-brand-100/25"
                    key={product.id}
                  >
                    <Image
                      alt={product.name}
                      width={50}
                      height={50}
                      className=" mb-auto aspect-square rounded-md object-cover object-top"
                      src={product.image}
                    />
                    <div className="grid w-full grid-flow-row">
                      <Link
                        href={`/products/${product.slug}`}
                        className=" text-sm font-medium text-gray-900 transition-all duration-300 ease-in-out hover:text-brand-500"
                      >
                        {product.name}
                      </Link>
                      <div className="grid grid-cols-2 place-content-end">
                        <h2 className="text-sm font-light text-gray-700">
                          Qt :{" "}
                          <span className=" font-medium text-brand-500">
                            {product.quantity}
                          </span>
                        </h2>
                        <h2 className="text-sm font-light text-gray-700">
                          Size :{" "}
                          <span className="  font-medium text-brand-500">
                            {product.size}
                          </span>
                        </h2>
                        <h2 className="inline-flex items-center gap-1 text-sm font-light text-gray-700">
                          Price :{" "}
                          <span className="inline-flex items-center font-medium text-brand-500">
                            <BsCurrencyRupee />
                            {product.price}
                          </span>
                        </h2>
                        <h2 className=" inline-flex items-center gap-1 text-sm font-light text-gray-700">
                          Total :{" "}
                          <span className="inline-flex items-center font-medium text-brand-500">
                            <BsCurrencyRupee />
                            {product.price}
                          </span>
                        </h2>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>

            <div className=" flex justify-between">
              <Button
                variant={"danger"}
                size={"medium"}
                onClick={() => {
                  deleteOrder.mutateAsync({
                    id: order.id,
                  });
                }}
                loading={deleteOrder.isLoading}
                disabled={deleteOrder.isLoading}
                type="button"
                className="mt-4"
              >
                Delete
              </Button>
              <Button
                variant={"secondary"}
                size={"medium"}
                loading={updateOrder.isLoading}
                disabled={updateOrder.isLoading}
                type="submit"
                className="ml-auto mt-4 w-fit"
              >
                Update
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default UpdateOrderForm;
