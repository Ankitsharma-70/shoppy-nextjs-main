import { TRPCError } from "@trpc/server";
import Razorpay from "razorpay";
import { z } from "zod";
import crypto from "crypto";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { prisma } from "~/server/db";
import { Coupon, Product } from "@prisma/client";
import { calculateTotalAfterDiscount } from "~/utils/lib";
import { minimumOrderPrice, shippingCharges } from "~/utils/constants/cart";

export const checkoutRouter = createTRPCRouter({
  createOrder: protectedProcedure
    .input(
      z.object({
        addressId: z.string(),
        couponCode: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const instance = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID ?? "",
        key_secret: process.env.RAZORPAY_KEY_SECRET,
      });
      const address = await prisma.address.findUnique({
        where: {
          id: input.addressId,
        },
      });
      if (!address) {
        return new TRPCError({
          code: "NOT_FOUND",
          message: "Address Not Found",
        });
      }
      const cart = await prisma.user
        .findUnique({
          where: {
            id: ctx.session.user.id,
          },
          include: {
            cart: {
              include: {
                product: true,
              },
            },
          },
        })
        .then((data) => data?.cart);
      if (!cart) {
        return new TRPCError({
          code: "NOT_FOUND",
          message: "No Product in Cart",
        });
      }
      if (cart.length === 0) {
        return new TRPCError({
          code: "NOT_FOUND",
          message: "No Product in Cart",
        });
      }

      const productIds = cart.map((item) => item.productId);
      const products = await prisma.product.findMany({
        where: {
          id: {
            in: productIds,
          },
        },
      });

      const errors = [];

      for (const item of cart) {
        //Traversing the cart products
        const { product, quantity, size } = item;
        const productToUpdate = products.find((p) => p.id === product.id);

        // Check if the product exists in the database
        if (!productToUpdate) {
          errors.push(`Product with ID ${product.name} not found`);
          continue;
        }

        const sizeData = productToUpdate.sizes.find(
          (s) => s.title.toLowerCase() === size.toLowerCase()
        );

        // Check if the requested size is available for the product
        if (!sizeData) {
          errors.push(`Size ${size} not available for product`);
        } else {
          // Check if there is enough stock for the requested quantity
          if (sizeData.quantity < quantity) {
            errors.push(
              `Not enough stock available for size ${size} of product`
            );
          }
        }
      }

      if (errors.length > 0) {
        return new TRPCError({
          code: "NOT_FOUND",
          message: errors[0],
        });
      }

      const items = cart.map((item) => {
        return {
          name: item.product.name,
          id: item.product.id,
          slug: item.product.slug,
          image: item.product?.images[0] ? item.product?.images[0].url : "",
          price: item.product.price,
          quantity: item.quantity,
          size: item.size,
          brand: item.product.brand,
        };
      });

      //Now check weather coupon code is present or not if add compute the discount
      const subTotal = items.reduce((sum: number, item) => {
        return item.price * item.quantity + sum;
      }, 0);

      let total = subTotal;
      if (input.couponCode) {
        const couponCode = await prisma.coupon.findFirst({
          where: {
            code: input.couponCode.toLowerCase(),
          },
          include: {
            users: true,
          },
        });
        if (!couponCode) {
          return new TRPCError({
            code: "NOT_FOUND",
            message: "Invalid Code",
          });
        }

        if (couponCode.expiry && new Date(couponCode.expiry) < new Date()) {
          // Coupon has expired
          return new TRPCError({
            code: "BAD_REQUEST",
            message: "This coupon has expired",
          });
        }

        if (
          couponCode.usageLimit &&
          couponCode.usageCount >= couponCode.usageLimit
        ) {
          // Coupon usage limit exceeded
          return new TRPCError({
            code: "BAD_REQUEST",
            message: "This coupon has reached its usage limit",
          });
        }

        if (
          couponCode.minimumOrderAmount &&
          subTotal < couponCode.minimumOrderAmount
        ) {
          // Cart total is below the minimum required for this coupon
          return new TRPCError({
            code: "BAD_REQUEST",
            message: `The minimum order amount for this coupon is $${couponCode.minimumOrderAmount}`,
          });
        }

        if (
          couponCode.oneTime &&
          couponCode.userIds &&
          couponCode.userIds.includes(ctx.session.user.id)
        ) {
          // Coupon has already been used by this user
          return new TRPCError({
            code: "BAD_REQUEST",
            message: "This coupon has already been used by you",
          });
        }

        await prisma.coupon.update({
          where: {
            id: couponCode.id,
          },
          data: {
            usageCount: {
              increment: 1,
            },
            userIds: {
              push: ctx.session.user.id,
            },
          },
        });

        const discount = calculateTotalAfterDiscount(subTotal, couponCode);
        total = discount.totalAfterDiscount;
      }

      //Checking with the minimum order price and adding shipping charges if total is less than minimum order price
      total = total > minimumOrderPrice ? total : total + shippingCharges;

      const order = await prisma.order.create({
        data: {
          total: total,
          subTotal: subTotal,
          trackingId: "",
          trackingLink: "",
          couponCode: input.couponCode || undefined,
          products: items,
          address: address,
          userId: ctx.session.user.id,
          customerId: "",
          paymentIntentId: "",
          paymentMethod: "online",
        },
      });

      const rzporder = await instance.orders.create({
        amount: total * 100,
        currency: "INR",
        receipt: ctx.session.user.id.toString(), //Provide string not the object id of mongodb
        notes: {
          orderId: order.id.toString(),
          userId: ctx.session.user.id.toString(), // Required to verify and empty cart after successfully place order
        },
      });

      const orderId = order.id;
      await prisma.order.update({
        where: {
          id: orderId,
        },
        data: {
          paymentIntentId: rzporder.id,
        },
      });
      return {
        message: "Order created Successfully",
        data: {
          orderId,
          id: rzporder.id,
        },
      };
    }),

  verifyOrder: protectedProcedure
    .input(
      z.object({
        razorpay_payment_id: z.string(),
        razorpay_order_id: z.string(),
        razorpay_signature: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
        input;

      const body = razorpay_order_id + "|" + razorpay_payment_id;
      const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET as string)
        .update(body.toString())
        .digest("hex");
      const isAuthentic = expectedSignature === razorpay_signature;
      const instance = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID as string,
        key_secret: process.env.RAZORPAY_KEY_SECRET,
      });

      // Very rare case

      if (!isAuthentic) {
        const paymentDetails = await instance.payments.fetch(
          razorpay_payment_id,
          {
            "expand[]": "card",
          }
        );
        await prisma.order.delete({
          where: {
            id: paymentDetails.notes.orderId,
          },
        });

        return new TRPCError({
          code: "BAD_REQUEST",
          message: " Something went wrong",
        });
      }

      const paymentDetails = await instance.payments.fetch(
        razorpay_payment_id,
        {
          "expand[]": "card",
        }
      );

      // Empty the user cart
      await prisma.user.update({
        where: {
          id: paymentDetails.notes.userId,
        },
        data: {
          cart: {
            deleteMany: {
              userId: paymentDetails.notes.userId,
            },
          },
        },
      });

      // Remove the quantity from the database
      const order = await prisma.order.findUnique({
        where: {
          id: paymentDetails.notes.orderId,
        },
      });
      if (!order) {
        return new TRPCError({
          code: "NOT_FOUND",
          message: "Order not found",
        });
      }
      const productIds = order?.products.map((p: any) => p.id);
      const products = await prisma.product.findMany({
        where: {
          id: {
            in: productIds,
          },
        },
      });
      const productsToUpdate: Product[] = [];
      order.products.map((product: any) => {
        const { id, quantity, size } = product;

        const productToUpdate = products.find((p) => p.id === id);
        if (productToUpdate) {
          const sizeData = productToUpdate.sizes.find(
            (s) => s.title.toLowerCase() === size.toLowerCase()
          );
          if (productToUpdate && sizeData) {
            sizeData.quantity -= quantity;
            productToUpdate.inStock -= quantity;
            productToUpdate.isInStock = productToUpdate.inStock ? true : false;
            productsToUpdate.push(productToUpdate);
          }
        }
      });
      await Promise.all(
        productsToUpdate.map((product) => {
          const { id, ...productData } = product;
          return prisma.product.update({
            where: {
              id: id,
            },
            data: {
              ...productData,
            },
          });
        })
      );
      await prisma.order.update({
        where: {
          id: paymentDetails.notes.orderId,
        },
        data: {
          paymentStatus: "completed",
          total: parseInt(paymentDetails.amount as string) / 100,
        },
      });
      return {
        orderId: order.id,
        message: "Verified Successfully",
      };
    }),
  orderFailed: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.order.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
