import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import ColorModeProvider from "./theme/ColorModeContext";
import { CssBaseline } from "@mui/material";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <ColorModeProvider>
      <BrowserRouter>
        <CssBaseline />
        <App />
      </BrowserRouter>
    </ColorModeProvider>
  </React.StrictMode>
);
