import React, { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import Link from "@mui/material/Link";

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (formData.password !== formData.confirmPassword) {
      setError("Hasła się nie zgadzają!");
      return;
    }
    if (formData.password.length < 6) {
      setError("Hasło musi mieć co najmniej 6 znaków!");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/registerUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          age: formData.age,
          username: formData.username,
          password: formData.password,
        }),
      });
      if (!response.ok) {
        throw new Error("Rejestracja nie powiodła się");
      }
      setSuccess("Rejestracja zakończona sukcesem!");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 400,
        mx: "auto",
        mt: 4,
        p: 3,
        boxShadow: 3,
        borderRadius: 2,
        bgcolor: "white",
      }}
    >
      <Typography variant="h5" gutterBottom>
        Rejestracja
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      {success && <Typography color="success.main">{success}</Typography>}
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Imię"
          name="firstName"
          margin="normal"
          onChange={handleChange}
          required
          sx={{ bgcolor: "#f5f5f5" }}
        />
        <TextField
          fullWidth
          label="Nazwisko"
          name="lastName"
          margin="normal"
          onChange={handleChange}
          required
          sx={{ bgcolor: "#f5f5f5" }}
        />
        <TextField
          fullWidth
          label="Wiek"
          name="age"
          type="number"
          margin="normal"
          onChange={handleChange}
          required
          sx={{ bgcolor: "#f5f5f5" }}
        />
        <TextField
          fullWidth
          label="Nazwa użytkownika"
          name="username"
          margin="normal"
          onChange={handleChange}
          required
          sx={{ bgcolor: "#f5f5f5" }}
        />
        <TextField
          fullWidth
          label="Hasło"
          name="password"
          type="password"
          margin="normal"
          onChange={handleChange}
          required
          sx={{ bgcolor: "#f5f5f5" }}
        />
        <TextField
          fullWidth
          label="Powtórz hasło"
          name="confirmPassword"
          type="password"
          margin="normal"
          onChange={handleChange}
          required
          sx={{ bgcolor: "#f5f5f5" }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
        >
          Zarejestruj
        </Button>
      </form>
      <Box mt={2} textAlign="center">
        <Typography variant="body2">
          Masz już konto?
          <Link href="/login" sx={{ cursor: "pointer" }}>
            Zaloguj się
          </Link>
        </Typography>
      </Box>
      <Box
        component="img"
        src="/logo_2.jpg"
        alt="Logo 2"
        sx={{
          width: "100%",
          maxWidth: 400,
          mt: "40px",
        }}
      />
    </Box>
  );
};

export default Register;
