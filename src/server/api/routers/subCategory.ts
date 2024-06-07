import { z } from "zod";

import {
  createTRPCRouter,
  adminProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const subCategoryRouter = createTRPCRouter({
  create: adminProcedure
    .input(
      z.object({
        name: z.string(),
        slug: z.string(),
        description: z.string().optional(),
        image: z.object({ cloudinaryId: z.string(), url: z.string() }),
        sizeOptions: z.string().array(),
        categoryId: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.subCategory.create({
        data: {
          name: input.name,
          slug: input.slug,
          description: input.description,
          image: input.image,
          categoryId: input.categoryId,
          sizeOptions: input.sizeOptions,
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
        categoryId: z.string(),
        sizeOptions: z.string().array(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.subCategory.update({
        where: {
          id: input.id,
        },
        data: {
          categoryId: input.categoryId,
          image: input.image,
          description: input.description,
          name: input.name,
          slug: input.slug,
          sizeOptions: input.sizeOptions,
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
      return ctx.prisma.subCategory.delete({
        where: {
          id: input.id,
        },
      });
    }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.subCategory.findMany({
      include: {
        category: true,
      },
    });
  }),
});
