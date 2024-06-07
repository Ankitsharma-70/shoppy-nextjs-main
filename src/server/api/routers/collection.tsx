import { z } from "zod";

import {
  createTRPCRouter,
  adminProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const collectionRouter = createTRPCRouter({
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
      return ctx.prisma.collection.create({
        data: {
          name: input.name,
          slug: input.slug,
          description: input.description,
          image: input.image,
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
      return ctx.prisma.collection.update({
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

  delete: adminProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.collection.delete({
        where: {
          id: input.id,
        },
      });
    }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.collection.findMany({
      include: {
        products: true,
      },
    });
  }),
});
