import { z } from "zod";
import {
  adminProcedure,
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";
import { prisma } from "~/server/db";

export const orderRouter = createTRPCRouter({
  getAll: protectedProcedure
    .input(
      z.object({
        limit: z.number().optional().default(10),
        page: z.number().optional().default(1),
      })
    )
    .query(async ({ ctx, input }) => {
      const orders = await prisma.order.findMany({
        skip: input.limit * (input.page - 1),
        where: {
          userId: ctx.session.user.id,
        },
        take: input.limit + 1,
        orderBy: {
          createdAt: "desc",
        },
      });
      const hasMore = orders.length > input.limit;
      if (hasMore) {
        orders.pop();
      }
      return {
        hasMore: hasMore,
        orders: orders,
      };
    }),
  update: adminProcedure
    .input(
      z.object({
        id: z.string(),
        address: z.any().optional(),
        couponCode: z.string().optional(),
        deliveryStatus: z.enum([
          "cancelled",
          "placed",
          "processing",
          "shipped",
          "delivered",
        ]),
        paymentStatus: z.enum(["pending", "failed", "cancelled", "completed"]),
        trackingId: z.string(),
        trackingLink: z.string(),
        subTotal: z.number(),
        total: z.number(),
        customerId: z.string(),
        paymentMethod: z.string(),
        paymentIntentId: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.order.update({
        where: {
          id: input.id,
        },
        data: {
          address: input.address,
          couponCode: input.couponCode,
          deliveryStatus: input.deliveryStatus,
          paymentStatus: input.paymentStatus,
          trackingId: input.trackingId,
          trackingLink: input.trackingLink,
          subTotal: input.subTotal,
          total: input.total,
          customerId: input.customerId,
          paymentIntentId: input.paymentIntentId,
          paymentMethod: input.paymentMethod,
        },
      });
    }),
  delete: adminProcedure
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
