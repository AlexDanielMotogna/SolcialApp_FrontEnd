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

              const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
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
        labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30"],
        datasets: [
          {
            data: [35, 45, 60, 70, 50, 55, 65, 85, 95, 80, 90, 100, 110, 120, 130, 140, 150, 160, 170, 180, 190, 200, 210, 220, 230, 240, 250, 260, 270, 280],
            fill: true,
            borderColor: "#CAC0FF",
            pointBackgroundColor: "#CAC0FF",
            pointRadius: 5,
            tension: 0.3,
            backgroundColor: (context: any) => {
              const chart = context.chart;
              const { ctx, chartArea } = chart;

              if (!chartArea) return "rgba(187, 185, 253, 0.1)";

              const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
              gradient.addColorStop(0, "rgba(187, 185, 253, 0.1)");
              gradient.addColorStop(1, "rgba(187, 185, 253, 0.1)");
              return gradient;
            },
          },
          {
            data: [40, 55, 60, 80, 75, 85, 100, 110, 120, 130, 140, 150, 160, 170, 180, 190, 200, 210, 220, 230, 240, 250, 260, 270, 280, 290, 300, 310, 320, 330],
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

              const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
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

  return <Line data={chartData} options={options} />;
};

export default WalletChart;
