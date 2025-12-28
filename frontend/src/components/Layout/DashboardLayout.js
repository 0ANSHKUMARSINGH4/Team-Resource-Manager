import React, { useContext, useState } from "react";
import { Box } from "@mui/material";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { ColorModeContext } from "../../theme/ColorModeContext";
import styles from "./Layout.module.css";
import Developers from "../../pages/Developers";
import Tasks from "../../pages/Tasks";
import Assignments from "../../pages/Assignments";
import Workload from "../../pages/Workload";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default function DashboardLayout() {
  const colorCtx = useContext(ColorModeContext);
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => setCollapsed((s) => !s);

  return (
    <Router>
      <div
        className={`${styles.root} ${collapsed ? "collapsed" : "expanded"}`}
        style={{
          // CSS variables for theme colors:
          "--bg":
            colorCtx.mode === "dark" ? "#071023" : "var(--mui-palette-background)",
          "--card-bg": colorCtx.mode === "dark" ? "#0f1720" : "#ffffff",
        }}
      >
        <Navbar onToggleSidebar={toggleSidebar} collapsed={collapsed} />
        <Sidebar collapsed={collapsed} />
        <Box component="main" className={styles.content}>
          <Routes>
            <Route path="/" element={<Developers />} />
            <Route path="/developers" element={<Developers />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/assignments" element={<Assignments />} />
            <Route path="/workload" element={<Workload />} />
          </Routes>
        </Box>
      </div>
    </Router>
  );
}
