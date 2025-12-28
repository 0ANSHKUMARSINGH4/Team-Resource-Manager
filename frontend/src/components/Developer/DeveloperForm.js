import React, { useState } from "react";
import { Box, TextField, Button, Grid, Paper, Typography } from "@mui/material";
import { useDeveloperStore } from "../../store/developerStore";

export default function DeveloperForm() {
  const addDeveloper = useDeveloperStore((s) => s.addDeveloper);
  const [form, setForm] = useState({ name: "", role: "", capacity: "" });

  const submit = () => {
    if (!form.name || !form.capacity) return;
    addDeveloper({ name: form.name, role: form.role || "Developer", capacity: Number(form.capacity) });
    setForm({ name: "", role: "", capacity: "" });
  };

  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        Add Developer
      </Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} md={5}>
          <TextField fullWidth label="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField fullWidth label="Role" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} />
        </Grid>
        <Grid item xs={12} md={2}>
          <TextField fullWidth label="Weekly Capacity" type="number" value={form.capacity} onChange={(e) => setForm({ ...form, capacity: e.target.value })} />
        </Grid>
        <Grid item xs={12} md={1}>
          <Button variant="contained" onClick={submit}>Add</Button>
        </Grid>
      </Grid>
    </Paper>
  );
}
