import apiClient from "./apiClient";

/* Developers */
export const fetchDevelopers = () =>
  apiClient.get("/developers");

export const createDeveloper = (data) =>
  apiClient.post("/developers", data);

/* Tasks */
export const fetchTasks = () =>
  apiClient.get("/tasks");

export const createTask = (data) =>
  apiClient.post("/tasks", data);

/* Assignments */
export const fetchAssignments = () =>
  apiClient.get("/assignments");

export const createAssignment = (data) =>
  apiClient.post("/assignments", data);

/* Workload */
export const fetchWorkload = () =>
  apiClient.get("/workload");
