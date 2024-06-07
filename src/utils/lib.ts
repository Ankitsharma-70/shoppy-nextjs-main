import type { CartItem, Product } from "@prisma/client";

//Adding a comma between price digit
export function priceFormat(value: number) {
  return value.toLocaleString("en-IN", {
    maximumFractionDigits: 2,
  });
}

//Get the Discount price if price and original price is different
export const getDiscountPercentage = ({
  price,
  originalPrice,
}: {
  price: number;
  originalPrice: number;
}) => {
  const discount = originalPrice - price;
  const percentage = (discount / originalPrice) * 100;
  return Math.ceil(percentage);
};
export function cartSubTotal({
  cart,
}: {
  cart: (CartItem & {
    product: Product;
  })[];
}) {
  const total = cart.reduce(
    (sum: number, { product, quantity }) => product.price * quantity + sum,
    0
  );
  return total;
}

export function cartTotalPriceMRP(
  cart: (CartItem & {
    product: Product;
  })[]
) {
  return cart.reduce(
    (sum, { product, quantity }) => product.originalPrice * quantity + sum,
    0
  );
}

export function calculateTotalAfterDiscount(
  subTotalOfCart: number,
  couponCode: any
) {
  let discountAmount = 0;
  let totalAfterDiscount = 0;
  if (couponCode?.type?.toLocaleString() === "fixed") {
    discountAmount = couponCode.discount;
    totalAfterDiscount = subTotalOfCart - couponCode.discount;
  } else if (couponCode?.type?.toLocaleString() === "percentage") {
    discountAmount = (subTotalOfCart / 100) * couponCode.discount;
    totalAfterDiscount = subTotalOfCart - discountAmount;
  }

  return {
    discountAmount,
    totalAfterDiscount,
  };
}
