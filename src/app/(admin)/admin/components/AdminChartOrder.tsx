"use client";
// @ts-nocheck
import { api } from "~/utils/api";
import LineChart from "~/components/chart/LineChart";
import { useState } from "react";
import Loader from "~/components/Loader";
const AdminChartOrder = () => {
  const [timeSpan, setTimeSpan] = useState<number>(7);

  const { data: orderData, isLoading } = api.admin.getChart.useQuery({
    timeSpan: timeSpan,
  });

  return (
    <ul className="grid  gap-6 md:grid-cols-2 ">
      <li className=" relative grid h-full rounded-3xl bg-white p-4 shadow-2xl  shadow-brand-100/25">
        <div className="flex justify-between rounded-full px-1 py-2 text-sm  text-gray-900">
          <h2 className=" font-medium">Sales</h2>
          <div className=" flex  gap-2 text-xs">
            <h2>Chart Range : </h2>
            <div>
              <input
                type="radio"
                name="timeSpan"
                id="weekly"
                value={7}
                defaultChecked
                onChange={(e) => setTimeSpan(parseInt(e.target.value))}
                className="peer hidden"
              />
              <label
                htmlFor="weekly"
                className="cursor-pointer rounded-full bg-white  p-1 px-2 font-medium peer-checked:bg-brand-100 peer-checked:ring-1 peer-checked:ring-brand-500"
              >
                W
              </label>
            </div>
            <div>
              <input
                type="radio"
                name="timeSpan"
                id="monthly"
                value={30}
                onChange={(e) => setTimeSpan(parseInt(e.target.value))}
                className="peer hidden"
              />
              <label
                htmlFor="monthly"
                className="cursor-pointer rounded-full bg-white p-1 px-2 font-medium peer-checked:bg-brand-100 peer-checked:ring-1 peer-checked:ring-brand-500"
              >
                M
              </label>
            </div>
          </div>
        </div>
        {!orderData || isLoading ? (
          <Loader />
        ) : (
          <LineChart data={orderData.orders} />
        )}
      </li>

      <li className=" relative grid  content-between overflow-hidden rounded-3xl  bg-white  p-4 shadow-2xl  shadow-brand-100/25">
        Todays Total Sales : {orderData?.orders[0]?.totalSales}
      </li>
    </ul>
  );
};

export default AdminChartOrder;
