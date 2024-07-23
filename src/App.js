import React, { useState, useEffect } from "react";
import { Container, Box, Button } from "@mui/material";
import ColorTabs from "./components/ColorTabs";
import QuestionCard from "./components/QuestionCard";
import Login from "./components/Login";

import "./App.css";

function App() {
  const [token, setToken] = useState(null);

  // Ustawia token po załadowaniu komponentu
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  // Obsługuje wylogowanie
  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <Container className="appContainer">
      {token ? (
        <>
          <ColorTabs />
          <Box mt={2}>
            <QuestionCard token={token} />
            {/* Przekazujemy token do QuestionCard */}
          </Box>
          <Box textAlign="center" mt={2}>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleLogout}
            >
              Wyloguj
            </Button>
          </Box>
        </>
      ) : (
        <Login setToken={setToken} />
      )}
    </Container>
  );
}

export default App;
