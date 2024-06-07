import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { prisma } from "~/server/db";

export const cartRouter = createTRPCRouter({
  add: protectedProcedure
    .input(
      z.object({
        quantity: z.number(),
        size: z.string(),
        productId: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const user = await prisma.user.findFirst({
        where: {
          id: ctx.session.user.id,
        },
        include: {
          cart: true,
        },
      });
      const existingItem = user?.cart.find(
        (item) => item.productId === input.productId
      );
      if (existingItem) {
        await prisma.user.update({
          where: {
            id: ctx.session.user.id,
          },
          data: {
            cart: {
              update: {
                where: {
                  id: existingItem.id,
                },
                data: {
                  quantity: input.quantity,
                  size: input.size,
                  productId: input.productId,
                },
              },
            },
          },
        });
        return {
          message: "Cart Updated Successfully",
        };
      }
      await prisma.user.update({
        where: {
          id: ctx.session.user.id,
        },
        data: {
          cart: {
            create: {
              quantity: input.quantity,
              size: input.size,
              productId: input.productId,
            },
          },
        },
      });
      return {
        message: "Added to cart ",
      };
    }),
  remove: protectedProcedure
    .input(
      z.object({
        cartItemId: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.cartItem.delete({
        where: {
          id: input.cartItemId,
        },
      });
    }),

  get: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.user
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
      .then((data) => data?.cart)
      .catch((e) => console.log(" >>>>>>>>>>>>>>>>>", e));
  }),
});
