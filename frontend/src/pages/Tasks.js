import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  MenuItem,
  LinearProgress,
  Chip,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import styles from "../components/Layout/Layout.module.css";
import { useTaskStore } from "../store/taskStore";

export default function Tasks() {
  const tasks = useTaskStore((s) => s.tasks);
  const loading = useTaskStore((s) => s.loading);
  const fetchTasks = useTaskStore((s) => s.fetchTasks);
  const addTask = useTaskStore((s) => s.addTask);
  const updateTaskProgress = useTaskStore((s) => s.updateTaskProgress);
  const deleteTask = useTaskStore((s) => s.deleteTask);
  const deleteCompletedTasks = useTaskStore((s) => s.deleteCompletedTasks);

  const [title, setTitle] = useState("");
  const [hours, setHours] = useState("");
  const [severity, setSeverity] = useState("Medium");

  // -------------------------
  // LOAD TASKS FROM BACKEND
  // -------------------------
  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  // -------------------------
  // ADD TASK
  // -------------------------
  const handleAddTask = () => {
    if (!title || !hours) return;

    addTask({
      title,
      hours: Number(hours),
      severity,
    });

    setTitle("");
    setHours("");
    setSeverity("Medium");
  };

  // -------------------------
  // PROGRESS HANDLER
  // -------------------------
  const handleProgress = (task) => {
    const newProgress = Math.min(100, (task.progress || 0) + 10);
    updateTaskProgress(task.id, newProgress);
  };

  const handleComplete = (task) => {
    updateTaskProgress(task.id, 100);
  };

  // -------------------------
  // DELETE SINGLE TASK
  // -------------------------
  const handleDeleteTask = (task) => {
    const ok = window.confirm(
      `Are you sure you want to delete task: ${task.title}?`
    );
    if (ok) {
      deleteTask(task.id);
    }
  };

  // -------------------------
  // DELETE ALL COMPLETED
  // -------------------------
  const handleDeleteCompleted = () => {
    const completed = tasks.filter((t) => t.status === "DONE");
    if (!completed.length) return;

    const names = completed.map((t) => t.title).join(", ");
    const ok = window.confirm(
      `Are you sure you want to delete the completed tasks: ${names}?`
    );

    if (ok) {
      deleteCompletedTasks();
    }
  };

  // -------------------------
  // STATUS COLOR
  // -------------------------
  const statusColor = (status) => {
    if (status === "DONE") return "success";
    if (status === "IN_PROGRESS") return "info";
    return "default";
  };

  return (
    <div>
      <Typography variant="h3" gutterBottom>
        Tasks
      </Typography>

      {/* ADD TASK */}
      <Box className={styles.card} sx={{ mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Add Task
        </Typography>

        <TextField
          fullWidth
          label="Task Name"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          sx={{ mb: 2 }}
        />

        <TextField
          fullWidth
          type="number"
          label="Estimated Hours"
          value={hours}
          onChange={(e) => setHours(e.target.value)}
          sx={{ mb: 2 }}
        />

        <TextField
          select
          fullWidth
          label="Severity"
          value={severity}
          onChange={(e) => setSeverity(e.target.value)}
          sx={{ mb: 2 }}
        >
          <MenuItem value="Low">Low</MenuItem>
          <MenuItem value="Medium">Medium</MenuItem>
          <MenuItem value="High">High</MenuItem>
          <MenuItem value="Critical">Critical</MenuItem>
        </TextField>

        <Button variant="contained" onClick={handleAddTask}>
          Add Task
        </Button>
      </Box>

      {/* DELETE COMPLETED */}
      <Box sx={{ mb: 1, display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="outlined"
          color="error"
          onClick={handleDeleteCompleted}
          disabled={!tasks.some((t) => t.status === "DONE")}
        >
          Delete All Completed Tasks
        </Button>
      </Box>

      {/* TASK LIST */}
      <Box className={styles.card}>
        {loading && <Typography>Loading tasks…</Typography>}

        {!loading && tasks.length === 0 && (
          <Typography>No tasks yet. Add one above.</Typography>
        )}

        {!loading &&
          tasks.map((task) => (
            <Box
              key={task.id}
              sx={{
                display: "grid",
                gridTemplateColumns: "2fr 1fr 1fr auto auto",
                gap: 2,
                alignItems: "center",
                py: 1.5,
                borderBottom: "1px solid rgba(0,0,0,0.05)",
              }}
            >
              <Box>
                <Typography>{task.title}</Typography>
                <Typography variant="caption">
                  {task.estimatedHours || task.hours} hrs
                </Typography>
              </Box>

              <Box>
                <Typography variant="caption">Progress</Typography>
                <LinearProgress
                  variant="determinate"
                  value={task.progress || 0}
                  sx={{ mt: 0.5 }}
                />
              </Box>

              <Box>
                <Chip
                  label={
                    task.status === "DONE"
                      ? "Completed"
                      : task.status === "IN_PROGRESS"
                      ? "In Progress"
                      : "Todo"
                  }
                  color={statusColor(task.status)}
                />
              </Box>

              <Box sx={{ display: "flex", gap: 1 }}>
                <Button
                  size="small"
                  variant="outlined"
                  onClick={() => handleProgress(task)}
                  disabled={task.status === "DONE"}
                >
                  +10%
                </Button>
                <Button
                  size="small"
                  variant="outlined"
                  onClick={() => handleComplete(task)}
                  disabled={task.status === "DONE"}
                >
                  Complete
                </Button>
              </Box>

              <IconButton
                color="error"
                onClick={() => handleDeleteTask(task)}
                sx={{ justifySelf: "flex-end" }}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          ))}
      </Box>
    </div>
  );
}
