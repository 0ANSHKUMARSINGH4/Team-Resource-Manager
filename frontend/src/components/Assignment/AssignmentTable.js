import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Box,
  IconButton,
  Paper,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAssignmentStore } from "../../store/assignmentStore";

export default function AssignmentTable() {
  const assignments = useAssignmentStore((s) => s.assignments);
  const unassign = useAssignmentStore((s) => s.unassign);

  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h6" gutterBottom>
        Assigned Tasks
      </Typography>

      <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Developer</TableCell>
              <TableCell>Task</TableCell>
              <TableCell align="center">Hours</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {assignments.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} sx={{ py: 6 }}>
                  <Typography align="center" sx={{ opacity: 0.7 }}>
                    No assignments yet. Assign a task above.
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              assignments.map((a) => (
                <TableRow key={a.id}>
                  <TableCell>{a.developer}</TableCell>
                  <TableCell>{a.taskTitle}</TableCell>
                  <TableCell align="center">{a.hours}</TableCell>
                  <TableCell>{a.status}</TableCell>
                  <TableCell align="center">
                    <IconButton onClick={() => unassign(a.id)}>
                      <DeleteIcon color="error" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}