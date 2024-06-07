import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BsCurrencyRupee, BsTruck } from "react-icons/bs";
import NotFound from "~/app/not-found";
import Breadcrumbs from "~/components/BreadCrumbs";
import { PageWrapper } from "~/components/wrapper/PageWrapper";
import { prisma } from "~/server/db";
interface Params {
  params: {
    id: string;
  };
}

const OrderPage = async ({ params: { id } }: Params) => {
  const order: any = await prisma.order.findFirst({
    where: {
      id: id,
    },
  });
  if (!order) {
    return <NotFound />;
  }
  return (
    <PageWrapper>
      <Breadcrumbs
        omitRootLabel
        replaceCharacterList={[{ from: "-", to: " " }]}
      />
      <div className=" mx-auto grid max-w-4xl gap-6 py-10">
        <div className=" grid h-fit w-full max-w-4xl gap-2">
          <h2 className=" font-medium text-brand-500">Thank You!</h2>
          <h2 className=" text-4xl font-medium text-gray-900">
            {order.deliveryStatus === "placed"
              ? "Order successfully placed"
              : order.deliveryStatus === "shipped"
              ? `It's on the way !`
              : order.deliveryStatus === "delivered"
              ? "Delivered to you !!!"
              : order.deliveryStatus === "cancelled"
              ? "Cancelled"
              : null}
          </h2>
          <p className=" font-light text-gray-700">
            {order.deliveryStatus === "shipped"
              ? `Your order has shipped and will be with you
            soon`
              : order.deliveryStatus === "delivered"
              ? "Your order is Delivered"
              : order.deliveryStatus === "processing"
              ? "We are processing you order"
              : order.deliveryStatus === "cancelled"
              ? "Order is cancelled"
              : order.deliveryStatus === "placed"
              ? "Order is placed. Soon we will process your order delivery"
              : null}
          </p>
        </div>
        {order.deliveryStatus === "shipped" ||
        order.trackingId ||
        order.trackingLink ? (
          <>
            <div>
              <h2 className="  font-semibold">Tracking number</h2>
              <Link
                href={order.trackingLink}
                target={"_blank"}
                className=" text-brand-500"
              >
                {order.trackingId}
              </Link>
            </div>
          </>
        ) : null}
        <hr />
        <div>
          <ul className=" grid gap-6 lg:grid-cols-2">
            {order?.products?.map((product: any) => {
              if (!product) {
                return null;
              }
              return (
                <li
                  className=" flex gap-6 rounded-md bg-white  p-2 shadow-2xl shadow-brand-100/25"
                  key={product.id}
                >
                  <Image
                    alt={product.name}
                    width={100}
                    height={100}
                    className=" aspect-square rounded-md object-cover"
                    src={product.image}
                  />
                  <div className="grid w-full grid-flow-row">
                    <Link
                      href={`/products/${product.slug}`}
                      className=" font-medium text-gray-900 transition-all duration-300 ease-in-out hover:text-brand-500"
                    >
                      {product.name}
                    </Link>
                    <div className="   grid grid-cols-2 place-content-end">
                      <h2 className=" text-sm font-light text-gray-700">
                        Qt :{" "}
                        <span className=" font-medium text-brand-500">
                          {product.quantity}
                        </span>
                      </h2>
                      <h2 className=" text-sm font-light text-gray-700">
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
        </div>
        <hr />
        <div className=" grid gap-6 md:grid-cols-2 ">
          <div className="grid gap-2 rounded-md bg-white  p-4 ">
            <div className="grid  gap-2 ">
              <h2 className=" inline-flex items-center gap-2 text-sm font-medium text-gray-900">
                <BsTruck size={24} />
                Shipping Address
              </h2>

              <p className=" text-sm font-light text-gray-700">
                {order.address.address1}, {order.address.city},
                {order.address.state},{order.address.pincode}
              </p>
            </div>
            <div className="grid  gap-2 ">
              <h2 className=" text-sm font-medium text-gray-900">
                Shipping Details
              </h2>
              <p className=" text-sm font-light text-gray-700">
                {order.trackingId
                  ? `Tracking id : ${order.trackingId}`
                  : "Order Delivery Details displaced here soon"}
              </p>
            </div>
          </div>
          <div className="grid gap-2 rounded-md bg-white  p-4 ">
            <h2 className="flex items-center justify-between">
              <span className="text-sm  font-medium ">SubTotal :</span>{" "}
              <span className=" flex items-center gap-1">
                <BsCurrencyRupee />
                {order.subTotal}
              </span>
            </h2>
            {order.couponCode && (
              <h2 className="flex items-center justify-between">
                <span className="text-sm  font-medium ">Discount :</span>{" "}
                <span>{order.couponCode}</span>
              </h2>
            )}
            <h2 className="flex items-center justify-between">
              <span className=" text-sm font-medium">Shipping :</span>{" "}
              {order.total > 3500 ? (
                <span className=" flex items-center gap-1 rounded-full bg-green-100 px-4 py-1 text-sm text-green-600">
                  Free
                </span>
              ) : (
                <>
                  <span className=" flex items-center gap-1">
                    <BsCurrencyRupee />
                    200
                  </span>
                </>
              )}
            </h2>
            <hr />
            <h2 className="flex items-center justify-between">
              <span className=" font-medium ">Total :</span>{" "}
              <span className=" flex items-center gap-1 text-lg font-semibold text-brand-500">
                <BsCurrencyRupee />
                {order.total}
              </span>
            </h2>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default OrderPage;
