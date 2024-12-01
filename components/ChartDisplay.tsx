"use client";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Pie } from 'react-chartjs-2';

// Burada gerekli bileşenleri kaydediyoruz
ChartJS.register(ArcElement, Tooltip, Legend);

export default function ChartDisplay() {
  const data = {
    labels: ['Rent', 'Food', 'Transportation'],
    datasets: [
      {
        data: [500, 300, 200],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };

  return <Pie data={data} />;
}
