import React, { useState } from "react";
import {
  Button,
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  TextField,
} from "@mui/material";

const Login = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Resetuj błąd przed próbą logowania

    try {
      const response = await fetch("http://localhost:8080/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();
      console.log("Response data:", data);

      if (data.message === "Login successful") {
        if (onLoginSuccess) {
          console.log("onLoginSuccess:", onLoginSuccess);
          onLoginSuccess(); // Wywołanie przekazanej funkcji
        }
      } else {
        throw new Error("Unexpected response content");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Nie udało się zalogować. Sprawdź dane logowania.");
    }
  };

  return (
    <Container>
      <Card sx={{ maxWidth: "60%", margin: "0 auto" }}>
        <CardContent>
          <Typography variant="h5">Logowanie</Typography>
          <form onSubmit={handleLogin}>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              mt={2}
            >
              <TextField
                label="Użytkownik"
                variant="outlined"
                margin="normal"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                fullWidth
              />
              <TextField
                label="Hasło"
                variant="outlined"
                margin="normal"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
              />
              <Button type="submit" variant="contained" color="primary" mt={2}>
                Zaloguj
              </Button>
              {error && <Typography color="error">{error}</Typography>}
            </Box>
          </form>
          <Typography mt={2}>
            Nie masz konta? <strong>Załóż nowe konto...</strong>
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Login;
