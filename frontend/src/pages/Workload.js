import React, { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Typography, Box } from "@mui/material";
import { useDeveloperStore } from "../store/developerStore";
import { useTaskStore } from "../store/taskStore";
import styles from "../components/Layout/Layout.module.css";

export default function Workload() {
  const developers = useDeveloperStore((s) => s.developers);
  const tasks = useTaskStore((s) => s.tasks);

  // ✅ Workload per developer
  const workloadData = useMemo(() => {
    return developers.map((dev) => {
      const assignedHours = tasks
        .filter((t) => t.assignedTo === dev.id && t.status !== "completed")
        .reduce((sum, t) => sum + Number(t.hours || 0), 0);

      return {
        name: dev.name,
        used: assignedHours,
        remaining: Math.max(dev.capacity - assignedHours, 0),
      };
    });
  }, [developers, tasks]);

  // ✅ Overall capacity usage
  const totalCapacity = developers.reduce((s, d) => s + d.capacity, 0);
  const totalUsed = workloadData.reduce((s, d) => s + d.used, 0);

  const overallData = [
    { name: "Used Capacity", value: totalUsed },
    { name: "Remaining Capacity", value: Math.max(totalCapacity - totalUsed, 0) },
  ];

  const COLORS = ["#ef4444", "#22c55e"];

  if (developers.length === 0) {
  return (
    <Typography sx={{ mt: 6, opacity: 0.7, textAlign: "center" }}>
      No workload data available. Add developers and tasks.
    </Typography>
  );
}

  return (
    <div>
      <Typography variant="h3" gutterBottom>
        Workload Dashboard
      </Typography>

      <Box className={styles.containerRow}>
        {/* LEFT CHART */}
        <Box className={`${styles.card} ${styles.colHalf}`}>
          <Typography variant="h6" gutterBottom>
            Workload Distribution
          </Typography>

          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={workloadData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="used" fill="#60a5fa" name="Used Hours" />
              <Bar
                dataKey="remaining"
                fill="#22c55e"
                name="Remaining Capacity"
              />
            </BarChart>
          </ResponsiveContainer>
        </Box>

        {/* RIGHT CHART */}
        <Box className={`${styles.card} ${styles.colHalf}`}>
          <Typography variant="h6" gutterBottom>
            Overall Capacity Usage
          </Typography>

          <ResponsiveContainer width="100%" height={320}>
            <PieChart>
              <Pie
                data={overallData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {overallData.map((entry, index) => (
                  <Cell
                    key={entry.name}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Box>
      </Box>
    </div>
  );
}
