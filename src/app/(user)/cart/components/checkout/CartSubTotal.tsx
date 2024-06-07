import type { CartItem, Product } from "@prisma/client";
import type { ReduxState } from "~/redux/store";

import { BsCurrencyRupee } from "react-icons/bs";
import Badge from "~/components/Badge";
import { useSelector } from "react-redux";

import {
  calculateTotalAfterDiscount,
  cartSubTotal,
  cartTotalPriceMRP,
  priceFormat,
} from "~/utils/lib";
import { minimumOrderPrice, shippingCharges } from "~/utils/constants/cart";

const CartSubTotal = ({
  cart,
}: {
  cart: (CartItem & {
    product: Product;
  })[];
}) => {
  const { coupon } = useSelector((state: ReduxState) => state.cart);
  const mrpOfCart = cartTotalPriceMRP(cart);
  const subTotalOfCart = cartSubTotal({
    cart,
  });

  //Send subtotal of cart and discount code output total discount applied after code and total of cart after applied
  const discount = calculateTotalAfterDiscount(subTotalOfCart, coupon);
  return (
    <>
      {mrpOfCart > subTotalOfCart ? (
        <Badge variant={"green"} size={"large"} className=" w-full ">
          You saved <BsCurrencyRupee />
          {priceFormat(mrpOfCart - subTotalOfCart)}
        </Badge>
      ) : null}

      <p className="  inline-flex items-center justify-between">
        <span className=" text-sm font-light capitalize text-gray-700">
          Total MRP (Incl. of taxes)
        </span>
        <span className=" flex items-center  text-base text-gray-900 ">
          <BsCurrencyRupee />
          {priceFormat(mrpOfCart)}
        </span>
      </p>
      <p className="  inline-flex items-center justify-between">
        <span className=" text-sm font-light capitalize text-gray-700">
          Sub Total :
        </span>

        <span
          className={`flex items-center  text-base  font-semibold text-brand-500
          `}
        >
          <BsCurrencyRupee />
          {priceFormat(subTotalOfCart)}
        </span>
      </p>

      {coupon && (
        <>
          <p className="  inline-flex items-center justify-between">
            <span className=" text-sm font-light capitalize text-gray-700">
              Applied Code : {coupon.code}
            </span>
            <span
              className={`flex items-center  text-base  font-semibold text-green-700
          `}
            >
              - <BsCurrencyRupee />
              {discount?.discountAmount}
            </span>
          </p>
        </>
      )}

      <p className="  inline-flex items-center justify-between">
        <span className=" text-sm font-light capitalize text-gray-700">
          Shipping Charges
        </span>

        {subTotalOfCart > minimumOrderPrice ? (
          <Badge variant={"green"} size={"medium"}>
            Free
          </Badge>
        ) : (
          <p className=" flex  items-center  text-sm font-medium  text-gray-900  md:text-sm ">
            + <BsCurrencyRupee />
            {priceFormat(shippingCharges)}
          </p>
        )}
      </p>

      <hr />

      <div className=" flex w-full items-center justify-between">
        <p className=" text-xs capitalize  text-gray-700 md:text-sm ">
          Total :
        </p>
        <div className=" flex items-center gap-2 text-end ">
          <p
            className={`flex items-center  text-lg  font-semibold text-brand-500 md:text-xl`}
          >
            <BsCurrencyRupee />
            {coupon ? (
              <span>
                {discount?.totalAfterDiscount +
                  (discount?.totalAfterDiscount > minimumOrderPrice
                    ? 0
                    : shippingCharges)}
              </span>
            ) : (
              <span>
                {subTotalOfCart +
                  (subTotalOfCart > minimumOrderPrice ? 0 : shippingCharges)}
              </span>
            )}
          </p>
        </div>
      </div>
    </>
  );
};

export default CartSubTotal;
