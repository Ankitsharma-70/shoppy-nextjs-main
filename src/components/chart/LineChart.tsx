"use client";
import React, { useRef } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  LineOptions,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { api } from "~/utils/api";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
  },
  scales: {
    x: {
      ticks: {
        display: true,
      },
      border: {
        display: false,
      },
      grid: {
        display: false,
      },
      title: {
        display: false,
      },
    },
    y: {
      ticks: {
        display: true,
        color: "gray",
        callback: function (value: any, index: any, values: any) {
          if (parseInt(value) >= 1000) {
            const suffixes = ["", "k", "M", "B", "T"];
            const suffixNum = Math.floor(("" + value).length / 3);
            let shortValue = parseFloat(
              (suffixNum !== 0
                ? value / Math.pow(1000, suffixNum)
                : value
              ).toPrecision(2)
            );
            if (shortValue % 1 !== 0) {
              shortValue = parseInt(shortValue.toFixed(1));
            }
            return shortValue + suffixes[suffixNum]!;
          } else {
            return value;
          }
        },
      },
      border: {
        display: false,
      },
      grid: {
        display: false,
      },
      title: {
        display: false,
      },
    },
  },
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

const LineChart = ({ data }: any) => {
  const chartRef = useRef();

  const chartData = {
    labels: data.map((day: any) => {
      return day._id;
    }),
    datasets: [
      {
        label: "Orders / Sales",
        data: data.map((day: any) => {
          return day.totalSales;
        }),
        borderColor: "#7a4ce6",
        border: "none",
        fill: true,
        backgroundColor: "transparent",
        hitRadius: 30,
        tension: 0.4,
      },
    ],
  };

  return <Line ref={chartRef} options={options} data={chartData} />;
};

export default LineChart;
