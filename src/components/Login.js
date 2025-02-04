import React, { useState } from "react";
import {
  Button,
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  TextField,
  Link,
} from "@mui/material";
import Register from "./Register"; // Importowanie komponentu rejestracji

const Login = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showRegister, setShowRegister] = useState(false); // Nowy stan do przełączania

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
      if (data.message === "Login successful") {
        onLoginSuccess?.();
      } else {
        throw new Error("Unexpected response content");
      }
    } catch (error) {
      setError("Nie udało się zalogować. Sprawdź dane logowania.");
    }
  };

  if (showRegister) {
    return <Register />; // Wyświetl komponent rejestracji
  }

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
          <Box
            display="flex"
            justifyContent="center"
            mt={2}
            width="100%" // Zapewnia pełną szerokość, aby wycentrować link
          >
            <Typography mt={2}>
              Nie masz konta?{" "}
              <Link component="button" onClick={() => setShowRegister(true)}>
                Załóż nowe konto
              </Link>
            </Typography>
          </Box>
          <Box
            display="flex"
            justifyContent="center"
            mt={2}
            width="100%" // Zapewnia pełną szerokość, aby wycentrować obrazek
          >
            <img
              src="/milionerzy_welcome.jpg"
              alt="Welcome"
              style={{ width: "100%", maxWidth: "400px", height: "auto" }}
            />
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Login;
