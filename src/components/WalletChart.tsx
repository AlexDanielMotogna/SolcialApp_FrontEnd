"use client";

import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const getDataForSelectedTab = (selectedTab: string): ChartData<"line"> => {
  switch (selectedTab) {
    case "7 Days":
      return {
        labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        datasets: [
          {
            data: [65, 59, 80, 81, 56, 75, 60],
            fill: true,
            borderColor: "#CAC0FF",
            pointBackgroundColor: "#CAC0FF",
            pointRadius: 5,
            tension: 0.3,
            backgroundColor: (context: any) => {
              const chart = context.chart;
              const { ctx, chartArea } = chart;

              if (!chartArea) return "rgba(187, 185, 253, 0.1)";

              const gradient = ctx.createLinearGradient(
                0,
                chartArea.top,
                0,
                chartArea.bottom
              );
              gradient.addColorStop(0, "rgba(187, 185, 253, 0.1)");
              gradient.addColorStop(1, "rgba(187, 185, 253, 0.1)");
              return gradient;
            },
          },
          {
            data: [55, 70, 60, 90, 65, 85, 50],
            fill: false,
            borderColor: "#ECAC31",
            tension: 0.3,
          },
        ],
      };
    case "30 Days":
      return {
        labels: Array.from({ length: 30 }, (_, i) => (i + 1).toString()),
        datasets: [
          {
            data: Array.from({ length: 30 }, (_, i) => Math.floor(30 + i * 5)),
            fill: true,
            borderColor: "#CAC0FF",
            pointBackgroundColor: "#CAC0FF",
            pointRadius: 5,
            tension: 0.3,
            backgroundColor: (context: any) => {
              const chart = context.chart;
              const { ctx, chartArea } = chart;

              if (!chartArea) return "rgba(187, 185, 253, 0.1)";

              const gradient = ctx.createLinearGradient(
                0,
                chartArea.top,
                0,
                chartArea.bottom
              );
              gradient.addColorStop(0, "rgba(187, 185, 253, 0.1)");
              gradient.addColorStop(1, "rgba(187, 185, 253, 0.1)");
              return gradient;
            },
          },
          {
            data: Array.from({ length: 30 }, (_, i) => Math.floor(50 + i * 6)),
            fill: false,
            borderColor: "#ECAC31",
            tension: 0.3,
          },
        ],
      };
    default:
      return {
        labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        datasets: [
          {
            data: [65, 59, 80, 81, 56, 75, 60],
            fill: true,
            borderColor: "#CAC0FF",
            pointBackgroundColor: "#CAC0FF",
            pointRadius: 5,
            tension: 0.3,
            backgroundColor: (context: any) => {
              const chart = context.chart;
              const { ctx, chartArea } = chart;

              if (!chartArea) return "rgba(187, 185, 253, 0.1)";

              const gradient = ctx.createLinearGradient(
                0,
                chartArea.top,
                0,
                chartArea.bottom
              );
              gradient.addColorStop(0, "rgba(187, 185, 253, 0.1)");
              gradient.addColorStop(1, "rgba(187, 185, 253, 0.1)");
              return gradient;
            },
          },
          {
            data: [55, 70, 60, 90, 65, 85, 50],
            fill: false,
            borderColor: "#ECAC31",
            tension: 0.3,
          },
        ],
      };
  }
};

const WalletChart: React.FC<{ selectedTab: string }> = ({ selectedTab }) => {
  const chartData = getDataForSelectedTab(selectedTab);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        display: false,
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "800px", 
        height: "300px", 
        margin: "0 auto", 
      }}
    >
      <Line data={chartData} options={options} />
    </div>
  );
};

export default WalletChart;
