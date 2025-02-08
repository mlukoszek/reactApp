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
import QuestionCard from "./QuestionCard";
import AdminPanel from "./AdminPanel";
import ProgressTable from "./ProgressTable";
import Ranking from "./Ranking";
import MyResults from "./MyResults";
import MyAccount from "./MyAccount";

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
  const [value, setValue] = useState("none");
  const [questionData, setQuestionData] = useState(null);

  useEffect(() => {
    const loginStatus = Cookies.get("loginStatus");
    if (loginStatus === "true") {
      setValue("none");
    }
  }, []);

  const handleNewGame = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/drawQuestion?difficulty=0",
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
      setQuestionData(data);
    } catch (error) {
      console.error("Error fetching question:", error);
    }
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (newValue === "one") {
      handleNewGame();
    } else if (newValue === "six") {
      handleLogout();
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
      setQuestionData(null);
      setValue("none");
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
                <Typography variant="h4" fontWeight="bold">
                  Witaj w Milionerach Online!
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    mt: 2,
                    pb: 10,
                    whiteSpace: "pre-line",
                  }}
                >
                  Sprawdź swoją wiedzę. Podejmij wyzwanie i wygraj wirtualny
                  milion! Graj, ucz się i rozwijaj swoje umiejętności.
                  Ekscytujący quiz inspirowany legendarnym teleturniejem czeka
                  na Ciebie.Czy masz to, czego potrzeba, by zdobyć główną
                  nagrodę?
                </Typography>
                <Box
                  component="img"
                  src="/milionerzy_studio.jpg"
                  alt="Milionerzy Studio"
                  sx={{
                    width: "100%",
                    maxWidth: 600,
                    mt: "80px",
                    display: "block",
                    margin: "auto",
                  }}
                />
              </Box>
            )}
            {value === "one" && (
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                {questionData ? (
                  <QuestionCard questionData={questionData} />
                ) : (
                  <Typography>Loading question...</Typography>
                )}
                <ProgressTable />
              </Box>
            )}
            {value === "two" && <Ranking />}
            {value === "three" && <MyResults />}
            {value === "four" && <MyAccount />}
            {value === "five" && <AdminPanel />}
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
            {value !== "none" &&
              value !== "one" &&
              value !== "two" &&
              value !== "three" &&
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
