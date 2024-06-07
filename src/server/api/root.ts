import { createTRPCRouter } from "~/server/api/trpc";
import { exampleRouter } from "~/server/api/routers/example";
import { categoryRouter } from "./routers/category";
import { productRouter } from "./routers/product";
import { subCategoryRouter } from "./routers/subCategory";
import { cartRouter } from "./routers/cart";
import { wishlistRouter } from "./routers/wishlist";
import { checkoutRouter } from "./routers/checkout";
import { addressRouter } from "./routers/address";
import { orderRouter } from "./routers/order";
import { adminRouter } from "./routers/admin";
import { couponRouter } from "./routers/coupon";
import { collectionRouter } from "./routers/collection";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  category: categoryRouter,
  subCategory: subCategoryRouter,
  product: productRouter,
  cart: cartRouter,
  checkout: checkoutRouter,
  wishlist: wishlistRouter,
  address: addressRouter,
  order: orderRouter,
  admin: adminRouter,
  coupon: couponRouter,
  collection: collectionRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
