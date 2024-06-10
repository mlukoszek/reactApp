import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import { theme } from "./theme";

const root = ReactDOM.createRoot(document.getElementById("root"));

const themeOption = createTheme(theme);

root.render(
  <React.StrictMode>
    <ThemeProvider theme={themeOption}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
);
