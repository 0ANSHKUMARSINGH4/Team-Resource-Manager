import React, { useContext } from "react";
import { Bar } from "react-chartjs-2";
import { Chart, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from "chart.js";
import { useTheme } from "@mui/material/styles";
Chart.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function BarChart({ labels = [], used = [], remaining = [] }) {
  const theme = useTheme();

  const data = {
    labels,
    datasets: [
      {
        label: "Used Hours",
        data: used,
        backgroundColor: theme.palette.mode === "dark" ? "#ff7a66" : "#ff8866",
      },
      {
        label: "Remaining Capacity",
        data: remaining,
        backgroundColor: theme.palette.mode === "dark" ? "#59a7e6" : "#66b3ff",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        labels: { color: theme.palette.text.primary },
      },
    },
    scales: {
      x: { ticks: { color: theme.palette.text.primary } },
      y: {
        ticks: { color: theme.palette.text.primary },
        beginAtZero: true,
      },
    },
  };

  return <Bar data={data} options={options} />;
}
