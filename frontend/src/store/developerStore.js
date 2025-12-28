import { create } from "zustand";
import apiClient from "../api/apiClient";

export const useDeveloperStore = create((set) => ({
  developers: [],
  loading: false,

  // -------------------------
  // FETCH DEVELOPERS
  // -------------------------
  fetchDevelopers: async () => {
    set({ loading: true });
    try {
      const res = await apiClient.get("/developers");
      set({ developers: res.data, loading: false });
    } catch (err) {
      console.error("Failed to fetch developers", err);
      set({ loading: false });
    }
  },

  // -------------------------
  // ADD DEVELOPER
  // -------------------------
  addDeveloper: async (developer) => {
    try {
      const res = await apiClient.post("/developers", developer);
      set((state) => ({
        developers: [...state.developers, res.data],
      }));
    } catch (err) {
      console.error("Failed to add developer", err);
    }
  },

  // -------------------------
  // REMOVE DEVELOPER  ✅ THIS WAS MISSING
  // -------------------------
  removeDeveloper: async (id) => {
    try {
      await apiClient.delete(`/developers/${id}`);
      set((state) => ({
        developers: state.developers.filter((d) => d.id !== id),
      }));
    } catch (err) {
      console.error("Failed to delete developer", err);
    }
  },
}));