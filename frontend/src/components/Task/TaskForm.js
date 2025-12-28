import React, { useState } from "react";
import { Paper, Grid, TextField, Button, Typography } from "@mui/material";
import { useTaskStore } from "../../store/taskStore";

export default function TaskForm() {
  const addTask = useTaskStore((s) => s.addTask);
  const [form, setForm] = useState({ title: "", estimatedHours: "", status: "TODO" });

  const submit = () => {
    if (!form.title) return;
    addTask({ title: form.title, estimatedHours: Number(form.estimatedHours || 0), status: form.status });
    setForm({ title: "", estimatedHours: "", status: "TODO" });
  };

  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" gutterBottom>Create Task</Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} md={6}>
          <TextField fullWidth label="Task Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField fullWidth label="Estimated Hours" type="number" value={form.estimatedHours} onChange={(e) => setForm({ ...form, estimatedHours: e.target.value })} />
        </Grid>
        <Grid item xs={12} md={2}>
          <TextField fullWidth label="Status" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} />
        </Grid>
        <Grid item xs={12} md={1}>
          <Button variant="contained" onClick={submit}>Add</Button>
        </Grid>
      </Grid>
    </Paper>
  );
}
