import { Routes, Route, Navigate } from "react-router-dom";
import Developers from "./pages/Developers";
import Tasks from "./pages/Tasks";
import Assignments from "./pages/Assignments";
import Workload from "./pages/Workload";
import Profile from "./pages/Profile";

const routes = (
  <Routes>
    <Route path="/" element={<Navigate to="/developers" />} />
    <Route path="/developers" element={<Developers />} />
    <Route path="/tasks" element={<Tasks />} />
    <Route path="/assignments" element={<Assignments />} />
    <Route path="/workload" element={<Workload />} />
    <Route path="/profile" element={<Profile />} />
  </Routes>
);

export default routes;
