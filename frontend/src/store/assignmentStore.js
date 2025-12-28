import { create } from "zustand";
import apiClient from "../api/apiClient";

export const useAssignmentStore = create((set) => ({
  assignments: [],
  loading: false,
  error: null,

  loadAssignments: async () => {
    try {
      set({ loading: true });
      const res = await apiClient.get("/assignments");
      set({ assignments: res.data, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  assignTask: async (payload) => {
    try {
      await apiClient.post("/assignments", payload);
      const res = await apiClient.get("/assignments");
      set({ assignments: res.data });
    } catch (err) {
      set({ error: err.message });
    }
  },
}));
