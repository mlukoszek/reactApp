import React, { useState } from "react";
import { Button, Box, Typography } from "@mui/material";
import ManageQuestions from "./ManageQuestions"; // Komponent zarządzania pytaniami
import ManageUsers from "./ManageUsers"; // Komponent zarządzania użytkownikami

const AdminPanel = () => {
  const [selectedPanel, setSelectedPanel] = useState(null);

  const handleButtonClick = (panel) => {
    setSelectedPanel(panel);
  };

  return (
    <Box sx={{ textAlign: "center", mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Panel Admina
      </Typography>

      {!selectedPanel ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Button
            variant="contained"
            color="primary"
            sx={{
              mb: 2,
              width: "200px", // Szerokość przycisków
              height: "50px", // Wysokość przycisków
              fontSize: "16px", // Czcionka
            }}
            onClick={() => handleButtonClick("questions")}
          >
            Zarządzanie pytaniami
          </Button>
          <Button
            variant="contained"
            color="primary"
            sx={{
              mb: 2,
              width: "200px",
              height: "50px",
              fontSize: "16px",
            }}
            onClick={() => handleButtonClick("users")}
          >
            Zarządzanie użytkownikami
          </Button>
        </Box>
      ) : selectedPanel === "questions" ? (
        <ManageQuestions />
      ) : selectedPanel === "users" ? (
        <ManageUsers />
      ) : null}
    </Box>
  );
};

export default AdminPanel;
