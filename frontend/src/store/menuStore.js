import { create } from "zustand";

const menuStore = create((set) => ({
  open: true,
  setOpen: (v) => set({ open: v }),
}));

export default menuStore;
