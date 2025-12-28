import React from "react";
import { Paper, Table, TableHead, TableRow, TableCell, TableBody, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTaskStore } from "../../store/taskStore";

export default function TaskTable() {
  const tasks = useTaskStore((s) => s.tasks);
  const removeTask = useTaskStore((s) => s.removeTask);

  return (
    <Paper sx={{ p: 2 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Hours</TableCell>
            <TableCell>Status</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tasks.map((t) => (
            <TableRow key={t.id}>
              <TableCell>{t.title}</TableCell>
              <TableCell>{t.estimatedHours}</TableCell>
              <TableCell>{t.status}</TableCell>
              <TableCell align="right">
                <IconButton color="error" onClick={() => removeTask(t.id)}><DeleteIcon /></IconButton>
              </TableCell>
            </TableRow>
          ))}
          {tasks.length === 0 && (
            <TableRow>
              <TableCell colSpan={4} align="center">No tasks created yet.</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Paper>
  );
}
