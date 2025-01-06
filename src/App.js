import React, { useState, useEffect } from "react";
import { Container } from "@mui/material";
import ColorTabs from "./components/ColorTabs";
import Login from "./components/Login";
import Cookies from "js-cookie";

import "./App.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Sprawdzanie statusu logowania z ciasteczek
    const loginStatus = Cookies.get("loginStatus") === "true";
    setIsAuthenticated(loginStatus);
  }, []);

  // Obsługuje sukces logowania
  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  // Obsługuje wylogowanie
  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/logout", {
        method: "POST",
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Failed to logout");
      }
      Cookies.remove("loginStatus");
      setIsAuthenticated(false);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <Container className="appContainer">
      {isAuthenticated ? (
        <>
          <ColorTabs onLogout={handleLogout} />
        </>
      ) : (
        <Login onLoginSuccess={handleLogin} />
      )}
    </Container>
  );
}

export default App;
