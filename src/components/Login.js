import React, { useState } from "react";
import { TextField, Button, Box, Container, Typography, Card, CardContent } from "@mui/material";

const Login = ({ setToken }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();
      localStorage.setItem("token", data.token); // Assuming response contains a 'token' field
      setToken(data.token);
    } catch (error) {
      setError("Nie udało się zalogować. Sprawdź dane logowania.");
    }
  };

  return (
    <Container>
      <Card>
        <CardContent>
          <Typography variant="h5">Logowanie</Typography>
          <form onSubmit={handleLogin}>
            <Box display="flex" flexDirection="column" alignItems="center" mt={2}>
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
        </CardContent>
      </Card>
    </Container>
  );
};

export default Login;
