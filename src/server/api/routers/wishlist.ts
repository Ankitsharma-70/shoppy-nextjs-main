import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { prisma } from "~/server/db";

export const wishlistRouter = createTRPCRouter({
  toggle: protectedProcedure
    .input(
      z.object({
        productId: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const user = await prisma.user.findFirst({
        where: {
          id: ctx.session.user.id,
        },
        include: {
          wishlist: true,
        },
      });
      const existingItem = user?.wishlist.find(
        (item) => item.productId === input.productId
      );
      if (existingItem) {
        await prisma.user.update({
          where: {
            id: ctx.session.user.id,
          },
          data: {
            wishlist: {
              deleteMany: {
                productId: input.productId,
              },
            },
          },
        });

        return {
          message: "Removed from the wishlist Successfully",
        };
      }
      await prisma.user.update({
        where: {
          id: ctx.session.user.id,
        },
        data: {
          wishlist: {
            create: {
              productId: input.productId,
            },
          },
        },
      });
      return {
        message: "Added to Wishlist ",
      };
    }),
  moveToWishlist: protectedProcedure
    .input(
      z.object({
        productId: z.string(),
        cartItemId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await prisma.user.update({
        where: {
          id: ctx.session.user.id,
        },
        data: {
          cart: {
            delete: {
              id: input.cartItemId,
            },
          },
          wishlist: {
            create: {
              productId: input.productId,
            },
          },
        },
      });

      return {
        message: "Moved to Wishlist",
      };
    }),
  get: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.user
      .findFirst({
        where: {
          id: ctx.session.user.id,
        },
        include: {
          wishlist: {
            include: {
              product: true,
            },
          },
        },
      })
      .then((data) => data?.wishlist);
  }),
});
