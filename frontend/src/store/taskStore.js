import { create } from "zustand";
import apiClient from "../api/apiClient";

export const useTaskStore = create((set, get) => ({
  tasks: [],
  loading: false,

  // -------------------------
  // FETCH TASKS
  // -------------------------
  fetchTasks: async () => {
    set({ loading: true });
    try {
      const res = await apiClient.get("/tasks");
      set({ tasks: res.data });
    } catch (err) {
      console.error("Failed to fetch tasks", err);
    } finally {
      set({ loading: false });
    }
  },

  // -------------------------
  // ADD TASK
  // -------------------------
  addTask: async (task) => {
    try {
      const res = await apiClient.post("/tasks", {
        title: task.title,
        estimatedHours: task.hours,
        status: "TODO",
      });
      set({ tasks: [...get().tasks, res.data] });
    } catch (err) {
      console.error("Failed to add task", err);
    }
  },

  // -------------------------
  // UPDATE PROGRESS
  // -------------------------
  updateTaskProgress: async (id, progress) => {
    try {
      await apiClient.patch(`/tasks/${id}/progress`, {
        progress,
      });

      set({
        tasks: get().tasks.map((t) =>
          t.id === id
            ? {
                ...t,
                progress,
                status: progress === 100 ? "DONE" : "IN_PROGRESS",
              }
            : t
        ),
      });
    } catch (err) {
      console.error("Failed to update progress", err);
    }
  },

  // -------------------------
  // DELETE TASK
  // -------------------------
  deleteTask: async (id) => {
    try {
      await apiClient.delete(`/tasks/${id}`);
      set({ tasks: get().tasks.filter((t) => t.id !== id) });
    } catch (err) {
      console.error("Failed to delete task", err);
    }
  },

  // -------------------------
  // DELETE COMPLETED TASKS
  // -------------------------
  deleteCompletedTasks: async () => {
    const completed = get().tasks.filter((t) => t.status === "DONE");

    for (const task of completed) {
      await apiClient.delete(`/tasks/${task.id}`);
    }

    set({
      tasks: get().tasks.filter((t) => t.status !== "DONE"),
    });
  },
}));
