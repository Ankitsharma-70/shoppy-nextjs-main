import { z } from "zod";
import { createTRPCRouter, adminProcedure } from "~/server/api/trpc";
import { prisma } from "~/server/db";
import { connectToDatabase } from "~/utils/connectMongo";

export const adminRouter = createTRPCRouter({
  getAllOrders: adminProcedure
    .input(
      z.object({
        page: z.number().default(1),
        limit: z.number().default(10),
        search: z.string().optional().default(""),
      })
    )
    .query(async ({ input }) => {
      const orders = await prisma.order.findMany({
        skip: input.limit * (input.page - 1),
        where: {
          OR: [
            {
              paymentIntentId: {
                contains: input.search ? input.search : undefined,
                mode: "insensitive",
              },
            },
            {
              id: {
                contains:
                  input.search && input.search.match("/^[0-9a-fA-f]{24}$")
                    ? input.search
                    : undefined,
                mode: "default",
              },
            },

            {
              userId: {
                contains:
                  input.search && input.search.match("/^[0-9a-fA-f]{24}$")
                    ? input.search
                    : undefined,
                mode: "default",
              },
            },
            {
              User: {
                OR: [
                  {
                    name: {
                      contains: input.search ? input.search : "",
                      mode: "insensitive",
                    },
                  },
                  {
                    email: {
                      contains: input.search ? input.search : "",
                      mode: "insensitive",
                    },
                  },
                ],
              },
            },
          ],
        },
        include: {
          User: true,
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
        orders: orders,
        hasMore: hasMore,
      };
    }),

  getAllProducts: adminProcedure
    .input(
      z.object({
        page: z.number().default(1),
        limit: z.number().default(10),
        search: z.string().optional().default(""),
      })
    )
    .query(async ({ input }) => {
      const products = await prisma.product.findMany({
        skip: input.limit * (input.page - 1),
        where: {
          OR: [
            {
              brand: {
                contains: input.search,
                mode: "insensitive",
              },
            },
            {
              name: {
                contains: input.search,
                mode: "insensitive",
              },
            },
            {
              description: {
                contains: input.search,
                mode: "insensitive",
              },
            },
          ],
        },
        include: {
          category: true,
          collections: true,
          subCategory: true,
        },
        take: input.limit + 1,
        orderBy: {
          createdAt: "desc",
        },
      });
      const hasMore = products.length > input.limit;
      if (hasMore) {
        products.pop();
      }
      return {
        products: products,
        hasMore: hasMore,
      };
    }),
  getAllUsers: adminProcedure
    .input(
      z.object({
        page: z.number().default(1),
        limit: z.number().default(10),
        search: z.string().optional().default(""),
      })
    )
    .query(async ({ input }) => {
      const users = await prisma.user.findMany({
        skip: input.limit * (input.page - 1),
        where: {
          OR: [
            {
              email: {
                contains: input.search,
                mode: "insensitive",
              },
            },
            {
              name: {
                contains: input.search,
                mode: "insensitive",
              },
            },
          ],
        },
        include: {
          cart: true,
          orders: true,
          wishlist: true,
        },
        take: input.limit + 1,
        orderBy: {
          createdAt: "desc",
        },
      });
      const hasMore = users.length > input.limit;
      if (hasMore) {
        users.pop();
      }
      return {
        users: users,
        hasMore: hasMore,
      };
    }),
  getAllCoupons: adminProcedure
    .input(
      z.object({
        page: z.number().default(1),
        limit: z.number().default(10),
        search: z.string().optional().default(""),
      })
    )
    .query(async ({ input }) => {
      const coupons = await prisma.coupon.findMany({
        skip: input.limit * (input.page - 1),
        where: {
          OR: [
            {
              code: {
                contains: input.search,
                mode: "insensitive",
              },
            },
          ],
        },
        include: {
          users: true,
        },
        take: input.limit + 1,
      });
      const hasMore = coupons.length > input.limit;
      if (hasMore) {
        coupons.pop();
      }
      return {
        coupons: coupons,
        hasMore: hasMore,
      };
    }),

  getChart: adminProcedure
    .input(
      z.object({
        timeSpan: z.number().default(7),
      })
    )
    .query(async ({ input }) => {
      const { db } = await connectToDatabase();

      const date = new Date();
      const pastDate = new Date();
      pastDate.setDate(date.getDate() - input.timeSpan);

      const orders = await db
        .collection("Order")
        .aggregate([
          {
            $match: {
              paymentStatus: "completed",
              createdAt: {
                $gte: pastDate,
              },
            },
          },
          {
            $group: {
              _id: {
                $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
              },
              totalSales: {
                $sum: "$total",
              },
              totalOrders: {
                $sum: 1,
              },
              totalProductSold: {
                $sum: {
                  $sum: "$products.quantity",
                },
              },
              orders: {
                $push: "$$ROOT",
              },
            },
          },
          {
            $sort: {
              _id: 1,
            },
          },
        ])
        .toArray();

      return {
        orders: JSON.parse(JSON.stringify(orders)),
      };
    }),
});
