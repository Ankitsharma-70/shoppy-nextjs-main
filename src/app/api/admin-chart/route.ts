import { cookies } from "next/dist/client/components/headers";
import { NextResponse } from "next/server";
import { connectToDatabase } from "~/utils/connectMongo";

export async function GET(request: Request) {
  //   console.log(request);
  const cookie = cookies();

  const { db } = await connectToDatabase();
  console.log(cookie.getAll());

  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth()));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

  const orders = await db
    .collection("Order")
    .aggregate([
      {
        $match: {
          paymentStatus: "completed",
          createdAt: {
            $gte: previousMonth,
          },
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
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

  return NextResponse.json({ orders: JSON.parse(JSON.stringify(orders)) });
}
