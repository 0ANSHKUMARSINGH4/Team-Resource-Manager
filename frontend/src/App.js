import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Developers from "./pages/Developers";
import Tasks from "./pages/Tasks";
import Assignments from "./pages/Assignments";
import Workload from "./pages/Workload";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate to="/developers" />} />
        <Route path="/developers" element={<Developers />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/assignments" element={<Assignments />} />
        <Route path="/workload" element={<Workload />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Layout>
  );
}
