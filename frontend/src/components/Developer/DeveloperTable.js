import React from "react";
import { useDeveloperStore } from "../../store/developerStore";
import { Paper, Table, TableHead, TableRow, TableCell, TableBody, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export default function DeveloperTable() {
  const developers = useDeveloperStore((s) => s.developers);
  const removeDeveloper = useDeveloperStore((s) => s.removeDeveloper);

  return (
    <Paper sx={{ p: 2 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Capacity</TableCell>
            <TableCell>Used</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {developers.map((d) => (
            <TableRow key={d.id}>
              <TableCell>{d.name}</TableCell>
              <TableCell>{d.role}</TableCell>
              <TableCell>{d.capacity}</TableCell>
              <TableCell>{d.used ?? 0}</TableCell>
              <TableCell align="right">
                <IconButton color="error" onClick={() => removeDeveloper(d.id)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
          {developers.length === 0 && (
            <TableRow>
              <TableCell colSpan={5} align="center">No developers added yet.</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Paper>
  );
}
