import React, { useState } from "react";
import {
  Button,
  Menu,
  MenuItem,
  Box,
  Typography,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useDeveloperStore } from "../../store/developerStore";
import { useTaskStore } from "../../store/taskStore";
import { useAssignmentStore } from "../../store/assignmentStore";
import styles from "../Layout/Layout.module.css";

export default function AssignmentForm() {
  const developers = useDeveloperStore((s) => s.developers);
  const tasks = useTaskStore((s) => s.tasks);
  const assign = useAssignmentStore((s) => s.assign);

  const [devAnchor, setDevAnchor] = useState(null);
  const [taskAnchor, setTaskAnchor] = useState(null);
  const [selectedDev, setSelectedDev] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);

  const handleDevOpen = (e) => setDevAnchor(e.currentTarget);
  const handleDevClose = () => setDevAnchor(null);

  const handleTaskOpen = (e) => setTaskAnchor(e.currentTarget);
  const handleTaskClose = () => setTaskAnchor(null);

  const handleAssign = () => {
    if (selectedDev && selectedTask) {
      assign({
        developerId: selectedDev.id,
        developer: selectedDev.name,
        taskId: selectedTask.id,
        taskTitle: selectedTask.title,
        hours: selectedTask.hours,
        status: "Assigned",
      });
      setSelectedDev(null);
      setSelectedTask(null);
    }
  };

  return (
    <Box className={styles.card}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Assign Task
      </Typography>

      <Box className={styles.formRow}>
        <Button
          variant="outlined"
          onClick={handleDevOpen}
          className={styles.iconButtonCompact}
          sx={{ minWidth: 140 }}
        >
          {selectedDev ? selectedDev.name : "Select Developer"}
          <ArrowDropDownIcon />
        </Button>

        <Menu
          anchorEl={devAnchor}
          open={Boolean(devAnchor)}
          onClose={handleDevClose}
        >
          {developers.map((d) => (
            <MenuItem
              key={d.id}
              onClick={() => {
                setSelectedDev(d);
                handleDevClose();
              }}
            >
              {d.name} — {d.role}
            </MenuItem>
          ))}
        </Menu>

        <Button
          variant="outlined"
          onClick={handleTaskOpen}
          className={styles.iconButtonCompact}
          sx={{ minWidth: 160 }}
        >
          {selectedTask ? selectedTask.title : "Select Task"}
          <ArrowDropDownIcon />
        </Button>

        <Menu
          anchorEl={taskAnchor}
          open={Boolean(taskAnchor)}
          onClose={handleTaskClose}
        >
          {tasks.map((t) => (
            <MenuItem
              key={t.id}
              onClick={() => {
                setSelectedTask(t);
                handleTaskClose();
              }}
            >
              {t.title} — {t.hours}h
            </MenuItem>
          ))}
        </Menu>

        <Button variant="contained" onClick={handleAssign}>
          Assign
        </Button>
      </Box>
    </Box>
  );
}