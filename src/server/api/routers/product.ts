import { Prisma } from "@prisma/client";
import { z } from "zod";

import {
  adminProcedure,
  createTRPCRouter,
  publicProcedure,
} from "~/server/api/trpc";
import { prisma } from "~/server/db";
import { sortFilter } from "~/utils/constants/searchFilter";

export const productRouter = createTRPCRouter({
  list: adminProcedure
    .input(
      z.object({
        name: z.string(),
        brand: z.string(),
        slug: z.string(),
        description: z.string(),
        images: z.array(
          z.object({ cloudinaryId: z.string(), url: z.string() })
        ),
        originalPrice: z.number(),
        price: z.number(),
        categoryId: z.string(),
        subCategoryId: z.string(),
        gender: z.enum(["Male", "Female", "Unisex"]),
        sizes: z.array(z.object({ title: z.string(), quantity: z.number() })),
        collectionIds: z.string().array().default([]),
      })
    )
    .mutation(({ ctx, input }) => {
      const inStock = input.sizes.reduce((prev, size) => {
        return (prev = prev + size.quantity);
      }, 0);

      return ctx.prisma.product.create({
        data: {
          name: input.name,
          brand: input.brand,
          slug: input.slug,
          description: input.description,
          images: input.images,
          originalPrice: input.originalPrice,
          price: input.price,
          isInStock: inStock > 0,
          inStock: inStock,
          categoryId: input.categoryId,
          subCategoryId: input.subCategoryId,

          sizes: input.sizes,
          gender: input.gender,
          collectionIds: {
            set: input.collectionIds,
          },
        },
      });
    }),
  update: adminProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string(),
        brand: z.string(),
        slug: z.string(),
        description: z.string(),
        images: z.array(
          z.object({ cloudinaryId: z.string(), url: z.string() })
        ),
        originalPrice: z.number(),
        price: z.number(),
        categoryId: z.string(),
        subCategoryId: z.string(),
        collectionIds: z.string().array().default([]),
        gender: z.enum(["Male", "Female", "Unisex"]),
        sizes: z.array(z.object({ title: z.string(), quantity: z.number() })),
      })
    )
    .mutation(({ ctx, input }) => {
      const inStock = input.sizes.reduce((prev, size) => {
        return (prev = prev + size.quantity);
      }, 0);

      return ctx.prisma.product.update({
        where: {
          id: input.id,
        },
        data: {
          name: input.name,
          brand: input.brand,
          slug: input.slug,
          description: input.description,
          images: input.images,
          originalPrice: input.originalPrice,
          price: input.price,
          isInStock: inStock > 0,
          inStock: inStock,
          categoryId: input.categoryId,
          subCategoryId: input.subCategoryId,
          collectionIds: {
            set: input.collectionIds,
          },

          sizes: input.sizes,
          gender: input.gender,
        },
      });
    }),

  delete: adminProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await prisma.cartItem.deleteMany({
        where: {
          productId: input.id,
        },
      });
      await prisma.wishlistItem.deleteMany({
        where: {
          productId: input.id,
        },
      });
      return ctx.prisma.product.delete({
        where: {
          id: input.id,
        },
      });
    }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.product.findMany();
  }),

  getProductByCategory: publicProcedure
    .input(
      z.object({
        category: z.string(),
      })
    )
    .query(({ ctx, input }) => {
      return ctx.prisma.product.findMany({
        where: {
          category: {
            name: input.category,
          },
        },
        take: 10,
      });
    }),

  getSearchProducts: publicProcedure
    .input(
      z.object({
        name: z.string().optional(),
        category: z.string().optional(),
        subCategory: z.string().optional(),
        sort: z.string().optional(),
        page: z.number().default(0),
      })
    )
    .mutation(async ({ input }) => {
      const limit = 9;

      const categoryIds = input.category
        ? await prisma.category
            .findMany({
              where: {
                name: {
                  in: input.category.split("_"),
                  mode: "insensitive",
                },
              },
            })
            .then((data) =>
              data.map((c) => {
                return c.id;
              })
            )
        : undefined;

      const subCategoryIds = input.subCategory
        ? await prisma.subCategory
            .findMany({
              where: {
                name: {
                  in: input.subCategory.split("_"),
                  mode: "insensitive",
                },
              },
            })
            .then((data) =>
              data.map((c) => {
                return c.id;
              })
            )
        : undefined;

      const where: any = {};

      let orderBy = {};

      if (input.sort) {
        switch (input.sort) {
          case sortFilter["Price: Low to High"]: {
            orderBy = {
              price: "asc",
            };
            break;
          }
          case sortFilter["Price: High to Low"]: {
            orderBy = {
              price: "desc",
            };
            break;
          }
          case sortFilter.newest: {
            orderBy = {
              createdAt: "desc",
            };
            break;
          }
        }
      }

      //Creating key value object pair to search in database (AND operation) so
      //whenever using or operation use 'or' as key of the object

      if (input.name) {
        where["OR"] = [
          {
            name: {
              contains: input.name,
              mode: "insensitive",
            },
          },
          {
            brand: {
              contains: input.name,
              mode: "insensitive",
            },
          },
          {
            description: {
              contains: input.name,
              mode: "insensitive",
            },
          },
        ];
      }
      if (categoryIds) {
        where["categoryId"] = {
          in: categoryIds,
        };
      }
      if (subCategoryIds) {
        where["subCategoryId"] = {
          in: subCategoryIds,
        };
      }

      const products = await prisma.product.findMany({
        skip: input.page * limit,
        where,
        take: limit + 1,
        orderBy,
      });
      const hasMore = products.length > limit;
      if (hasMore) {
        products.pop();
      }
      return {
        products,
        hasMore,
      };
    }),

  relatedProducts: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.category
        .findUnique({
          where: {
            id: input.id,
          },
          include: {
            products: {
              take: 10,
            },
          },
        })
        .then((data) => data?.products);
    }),
});
