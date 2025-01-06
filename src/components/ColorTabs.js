import React, { useState, useEffect } from "react";
import {
  Tabs,
  Tab,
  Box,
  Container,
  Card,
  CardContent,
  Typography,
  Button,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Cookies from "js-cookie";
import QuestionCard from "./QuestionCard"; // Import komponentu QuestionCard
import AdminPanel from "./AdminPanel"; // Import nowego komponentu AdminPanel

const theme = createTheme({
  components: {
    MuiTabs: {
      styleOverrides: {
        root: {
          backgroundColor: "gray",
          borderRadius: "4px",
        },
        indicator: {
          backgroundColor: "gray",
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          color: "white",
          "&.Mui-selected": {
            color: "white",
            fontWeight: "bold",
            backgroundColor: "#616161",
          },
        },
      },
    },
  },
});

function ColorTabs() {
  const [value, setValue] = useState("none"); // Domyślna wartość "none"
  const [questionData, setQuestionData] = useState(null); // Stan na pytanie

  useEffect(() => {
    const loginStatus = Cookies.get("loginStatus");
    if (loginStatus === "true") {
      setValue("none"); // Ustawia domyślną zakładkę na "none" po zalogowaniu
    }
  }, []);

  const handleNewGame = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/drawQuestion?difficulty=0", // Pierwsze pytanie z trudnością 0
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        },
      );
      if (!response.ok) {
        throw new Error(`Failed to fetch question: ${response.statusText}`);
      }
      const data = await response.json();
      setQuestionData(data); // Ustawienie pytania w stanie
      setValue("one"); // Przejdź do zakładki "Nowa gra"
    } catch (error) {
      console.error("Error fetching question:", error);
    }
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (newValue === "one") {
      handleNewGame(); // Pobierz pytanie, gdy zakładka "Nowa gra" jest wybrana
    } else if (newValue === "six") {
      handleLogout(); // Wyloguj, gdy zakładka "Wyloguj" jest wybrana
    }
  };

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
      setQuestionData(null); // Resetuje pytanie po wylogowaniu
      setValue("none"); // Ustawia zakładkę na "none" po wylogowaniu
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <Box
          component="img"
          src="logo.jpg"
          alt="Logo"
          sx={{ height: 50, marginRight: 2 }}
        />
        <Tabs value={value} onChange={handleChange} sx={{ marginLeft: "50px" }}>
          <Tab value="one" label="Nowa gra" />
          <Tab value="two" label="Ranking" />
          <Tab value="three" label="Moje wyniki" />
          <Tab value="four" label="Moje konto" />
          <Tab value="five" label="Admin" />
          <Tab value="six" label="Wyloguj" />
        </Tabs>
      </Box>
      <Container sx={{ mt: 4 }}>
        <Card sx={{ maxWidth: "60%", margin: "auto" }}>
          <CardContent>
            {value === "none" && (
              <Box textAlign="center">
                <Typography variant="h6">WELCOME TO MILIONERZY</Typography>
              </Box>
            )}
            {value === "one" && questionData && (
              <QuestionCard questionData={questionData} /> // Przekazywanie załadowanych danych do QuestionCard
            )}
            {value === "six" && (
              <Box textAlign="center">
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleLogout}
                >
                  Wyloguj
                </Button>
              </Box>
            )}
            {/* Komponent AdminPanel dla zakładki "Admin" */}
            {value === "five" && <AdminPanel />}
            {value !== "none" &&
              value !== "one" &&
              value !== "five" &&
              value !== "six" && (
                <Typography>
                  Tu będzie zawartość innych komponentów...
                </Typography>
              )}
          </CardContent>
        </Card>
      </Container>
    </ThemeProvider>
  );
}

export default ColorTabs;
