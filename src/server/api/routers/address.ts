import { z } from "zod";

import {
  createTRPCRouter,
  adminProcedure,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const addressRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        email: z.string(),
        phone: z.number(),
        address1: z.string(),
        address2: z.string().optional().default(""),
        city: z.string(),
        state: z.string(),
        pincode: z.number(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.address.create({
        data: {
          name: input.name,
          email: input.email,
          mobile: input.phone,
          address1: input.address1,
          address2: input.address2,
          city: input.city,
          state: input.state,
          pincode: input.pincode,
          userId: ctx.session.user.id,
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
      return ctx.prisma.address.delete({
        where: {
          id: input.id,
        },
      });
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.address.findMany({
      where: {
        userId: ctx.session?.user.id,
      },
    });
  }),
});
