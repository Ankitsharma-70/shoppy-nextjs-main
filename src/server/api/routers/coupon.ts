import { TRPCError } from "@trpc/server";
import { z } from "zod";

import {
  adminProcedure,
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";
import { prisma } from "~/server/db";

export const couponRouter = createTRPCRouter({
  verify: protectedProcedure
    .input(z.object({ code: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const couponCode = await prisma.coupon.findFirst({
        where: {
          code: input.code.toLowerCase(),
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
      const userCart = await prisma.user
        .findFirst({
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
      if (!userCart?.length) {
        return new TRPCError({
          code: "BAD_REQUEST",
          message: "Cart is Empty",
        });
      }
      const subTotal = userCart.reduce(
        (a, i) => a + i.product.price * i.quantity,
        0
      );
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
      console.log(couponCode, ctx.session.user.id);

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

      return {
        message: `Hello`,
        couponCode: {
          code: couponCode.code,
          discount: couponCode.discount,
          oneTime: couponCode.discount,
          type: couponCode.type,
          expiry: couponCode.expiry,
        },
      };
    }),
  create: adminProcedure
    .input(
      z.object({
        code: z.string(),
        minimumOrderAmount: z.number(),
        discount: z.number(),
        expiry: z.date(),
        oneTime: z.boolean(),
        type: z.enum(["fixed", "percentage"]),
        usageLimit: z.number(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      return ctx.prisma.coupon.create({
        data: {
          code: input.code,
          minimumOrderAmount: input.minimumOrderAmount,
          discount: input.discount,
          expiry: input.expiry,
          oneTime: input.oneTime,
          type: input.type,
          usageLimit: input.usageLimit,
        },
      });
    }),
  update: adminProcedure
    .input(
      z.object({
        id: z.string(),
        code: z.string(),
        minimumOrderAmount: z.number(),
        discount: z.number(),
        expiry: z.date(),
        oneTime: z.boolean(),
        type: z.enum(["fixed", "percentage"]),
        usageLimit: z.number(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      return ctx.prisma.coupon.update({
        where: {
          id: input.id,
        },
        data: {
          code: input.code,
          minimumOrderAmount: input.minimumOrderAmount,
          discount: input.discount,
          expiry: input.expiry,
          oneTime: input.oneTime,
          type: input.type,
          usageLimit: input.usageLimit,
        },
      });
    }),
  delete: adminProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      return ctx.prisma.coupon.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
