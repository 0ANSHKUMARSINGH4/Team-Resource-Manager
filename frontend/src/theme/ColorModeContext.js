import React, { createContext, useMemo, useState, useEffect } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";

export const ColorModeContext = createContext({
  mode: "light",
  toggleColorMode: () => {},
});

export default function ColorModeProvider({ children }) {
  const [mode, setMode] = useState("light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", mode);
  }, [mode]);

  const colorMode = useMemo(
    () => ({
      mode,
      toggleColorMode: () =>
        setMode((prev) => (prev === "light" ? "dark" : "light")),
    }),
    [mode]
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
        typography: {
          fontFamily:
            "Rubik, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
}
