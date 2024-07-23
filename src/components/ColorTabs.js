import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  components: {
    MuiTabs: {
      styleOverrides: {
        root: {
          backgroundColor: "gray", // Ustawienie tła dla kontenera Tabs
          borderRadius: "4px",
        },
        indicator: {
          backgroundColor: "gray", // Kolor wskaźnika zakładki (możesz to zmienić, jeśli chcesz)
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          color: "white", // Ustawienie koloru tekstu na biały
          "&.Mui-selected": {
            color: "white", // Kolor tekstu wybranego elementu
            fontWeight: "bold", // Boldowanie wybranego elementu
            backgroundColor: "#616161", // Wypełnienie wybranego elementu
          },
        },
      },
    },
  },
});

function ColorTabs() {
  const [value, setValue] = React.useState("one");

  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (newValue === "one") {
      fetch("http://localhost:8080/drawQuestion?start=0", {
        method: "GET",
      })
        .then((response) => {
          if (response.ok) {
            // Handle successful response
            console.log("Question drawn successfully");
            return response.json(); // Assuming the response is JSON
          } else {
            // Handle error
            console.error("Failed to draw question");
          }
        })
        .then((data) => {
          if (data) {
            // Do something with the data
            console.log("Question Data:", data);
          }
        })
        .catch((error) => {
          console.error("Error during request:", error);
        });
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box
          component="img"
          src="logo.jpg"
          alt="Logo"
          sx={{ height: 50, marginRight: 2 }}
        />
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="secondary tabs example"
        >
          <Tab value="one" label="Nowa gra" />
          <Tab value="two" label="Ranking" />
          <Tab value="three" label="Moje wyniki" />
          <Tab value="four" label="Moje konto" />
          <Tab value="five" label="Wyloguj" />
        </Tabs>
      </Box>
    </ThemeProvider>
  );
}

export default ColorTabs;
