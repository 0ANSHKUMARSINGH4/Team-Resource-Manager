// src/theme/theme.js
import { createTheme } from "@mui/material/styles";

export const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          primary: { main: "#1976d2" },
          secondary: { main: "#9c27b0" },
          background: {
            default: "#f5f7fa", // page background
            paper: "#ffffff",   // cards, sidebar, etc.
          },
        }
      : {
          primary: { main: "#2196f3" },
          secondary: { main: "#ce93d8" },
          background: {
            default: "#0b1120", // dark page background
            paper: "#111827",   // dark cards/sidebar
          },
          text: {
            primary: "#f9fafb",
            secondary: "#d1d5db",
          },
        }),
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
  },
});

export const buildTheme = (mode) => createTheme(getDesignTokens(mode));
