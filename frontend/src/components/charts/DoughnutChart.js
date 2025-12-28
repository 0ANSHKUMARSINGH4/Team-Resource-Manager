import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import { useTheme } from "@mui/material/styles";
Chart.register(ArcElement, Tooltip, Legend);

export default function DoughnutChart({ used = 0, remaining = 0 }) {
  const theme = useTheme();

  const data = {
    labels: ["Used Capacity", "Remaining"],
    datasets: [
      {
        data: [used, remaining],
        backgroundColor: [
          theme.palette.mode === "dark" ? "#ff7a66" : "#ff6b6b",
          theme.palette.mode === "dark" ? "#39c37d" : "#38d47d",
        ],
        borderColor: "transparent",
      },
    ],
  };

  const options = {
    cutout: "70%",
    maintainAspectRatio: true,
    plugins: {
      legend: { labels: { color: theme.palette.text.primary } },
    },
  };

  return <Doughnut data={data} options={options} />;
}
