import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Box,
} from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import TaskIcon from "@mui/icons-material/TaskAlt";
import ChecklistIcon from "@mui/icons-material/Checklist";
import GridViewIcon from "@mui/icons-material/GridView";
import { Link as RouterLink } from "react-router-dom";
import styles from "./Layout.module.css";

const drawerWidth = 240;
const collapsedWidth = 72;

export default function Sidebar({ collapsed }) {
  const width = collapsed ? collapsedWidth : drawerWidth;

  return (
    <Drawer
      variant="permanent"
      PaperProps={{
        sx: {
          width,
          boxSizing: "border-box",
          top: "64px",
          height: "calc(100% - 64px)",
          position: "fixed",
          overflowX: "hidden",
        },
        className: styles.sidebarPaper,
      }}
      open
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          p: 2,
          justifyContent: collapsed ? "center" : "flex-start",
          gap: collapsed ? 0 : 2,
        }}
      >
        <Avatar sx={{ bgcolor: "primary.main" }}>TM</Avatar>
        {!collapsed && (
          <div className={styles.hideWhenCollapsed}>Team Manager</div>
        )}
      </Box>

      <List>
        <Item
          collapsed={collapsed}
          to="/developers"
          icon={<PeopleIcon />}
          label="Developers"
        />
        <Item
          collapsed={collapsed}
          to="/tasks"
          icon={<TaskIcon />}
          label="Tasks"
        />
        <Item
          collapsed={collapsed}
          to="/assignments"
          icon={<ChecklistIcon />}
          label="Assignments"
        />
        <Item
          collapsed={collapsed}
          to="/workload"
          icon={<GridViewIcon />}
          label="Workload"
        />
      </List>
    </Drawer>
  );
}

function Item({ to, icon, label, collapsed }) {
  return (
    <ListItem disablePadding>
      <ListItemButton component={RouterLink} to={to}>
        <ListItemIcon>{icon}</ListItemIcon>
        {!collapsed && (
          <div className={styles.hideWhenCollapsed}>
            <ListItemText primary={label} />
          </div>
        )}
      </ListItemButton>
    </ListItem>
  );
}
