"use client";

import React from 'react';
import { Line } from 'react-chartjs-2';
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
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const data: ChartData<'line'> = {
  labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  datasets: [
    {
      data: [65, 59, 80, 81, 56, 75, 60],
      fill: true,  // Enable filling below the line
      borderColor: '#CAC0FF',
      pointBackgroundColor: '#CAC0FF',
      pointRadius: 5,
      tension: 0.3,
      backgroundColor: (context: any) => {
        const chart = context.chart;
        const { ctx, chartArea } = chart;

        // Check if chartArea is defined
        if (!chartArea) return 'rgba(187, 185, 253, 0.1)'; // Default color if chartArea is undefined

        const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
        gradient.addColorStop(0, 'rgba(187, 185, 253, 0.1)'); // Light purple with 10% opacity
        gradient.addColorStop(1, 'rgba(187, 185, 253, 0.1)'); // Same at the bottom
        return gradient;
      },
    },
    {
      data: [55, 70, 60, 90, 65, 85, 50],
      fill: false,
      borderColor: '#ECAC31',
      tension: 0.3,
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      enabled: true,
      backgroundColor: '#2C2C30',
      titleColor: '#fff',
      bodyColor: '#fff',
      borderColor: '#44444A',
      borderWidth: 1,
      caretSize: 5,
      padding: 10,
      font: {
        size: 16,
      },
      callbacks: {
        title: (tooltipItem: any) => {
          const date = tooltipItem[0].label;
          return `${date} 2023`;
        },
        label: (tooltipItem: any) => {
          const solValue = tooltipItem.raw;
          return `SOL ${solValue.toFixed(5)}`;
        },
      },
    },
  },
  scales: {
    y: {
      display: false,
      grid: {
        color: '#2C2C30',
      },
    },
    x: {
      grid: {
        color: '#2C2C30',
        borderColor: '#2C2C30',
        borderWidth: 2,
      },
      ticks: {
        color: '#ACB5BB',
      },
    },
  },
  tooltips: {
    callbacks: {
      label: function(tooltipItem: any) {
        const value = tooltipItem.raw;
        return `SOL ${value.toFixed(5)}`;
      },
    },
    custom: function(tooltipModel: any) {
      let tooltipElement = document.querySelector('.chartjs-tooltip') as HTMLElement;
      if (tooltipElement) {
        let tooltipText = tooltipElement.querySelectorAll('.tooltip-body span') as NodeListOf<HTMLElement>;
        tooltipText.forEach((item, index) => {
          item.style.fontSize = '1.2rem';
          if (index === 0) {
            item.style.color = '#ACB5BB';
          } else {
            item.style.color = '#FFFFFF';
          }
        });
      }
    },
  },
};

const WalletChart: React.FC = () => {
  return <Line data={data} options={options} />;
};

export default WalletChart;
