import React from "react";
import { AppBar, Toolbar, Typography, Box } from "@mui/material";

function Header() {
  return (
    <AppBar
      position="relative"
      sx={{
        top: 20,
        left: "50%",
        transform: "translateX(-50%)",
        width: "100%",
        maxWidth: "1150px",
        background: "linear-gradient(to right, #add8e6, #00008b)",
        color: "white",
      }}
    >
      <Toolbar>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          width="100%"
        >
          <Typography variant="h4" component="div" gutterBottom>
            SPRAWDŹ NAJLEPSZE PRZEPISY KULINARNE RAZEM Z NAMI !!!
          </Typography>
          <Typography variant="subtitle1" component="div">
            Zainspiruj się nowymi pomysłami na codzienne gotowanie
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
