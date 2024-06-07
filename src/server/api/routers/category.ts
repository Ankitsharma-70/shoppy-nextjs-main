import { z } from "zod";

import {
  createTRPCRouter,
  adminProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const categoryRouter = createTRPCRouter({
  create: adminProcedure
    .input(
      z.object({
        name: z.string(),
        slug: z.string(),
        description: z.string().optional(),
        image: z.object({ cloudinaryId: z.string(), url: z.string() }),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.category.create({
        data: {
          name: input.name,
          slug: input.slug,
          description: input.description,
          image: input.image,
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
      return ctx.prisma.category.delete({
        where: {
          id: input.id,
        },
      });
    }),

  update: adminProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string(),
        slug: z.string(),
        description: z.string().optional(),
        image: z.object({ cloudinaryId: z.string(), url: z.string() }),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.category.update({
        where: {
          id: input.id,
        },
        data: {
          name: input.name,
          slug: input.slug,
          description: input.description,
          image: input.image,
        },
      });
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.category.findMany();
  }),
});
