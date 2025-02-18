import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function Ranking() {
  const [players, setPlayers] = useState([]);

  // Prize map for results
  const prizeMap = {
    1: "1 000 zł",
    2: "2 000 zł",
    3: "5 000 zł",
    4: "10 000 zł",
    5: "15 000 zł",
    6: "25 000 zł",
    7: "50 000 zł",
    8: "75 000 zł",
    9: "150 000 zł",
    10: "250 000 zł",
    11: "500 000 zł",
    12: "1 000 000 zł",
  };

  useEffect(() => {
    fetch("http://localhost:8080/api/getMyResults", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => setPlayers(data))
      .catch((error) => console.error("Błąd pobierania danych:", error));
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ width: "100%" }} aria-label="player ranking table">
        <TableHead>
          <TableRow>
            <TableCell>Miejsce</TableCell>
            <TableCell>Imię i Nazwisko</TableCell>
            <TableCell>Username</TableCell>
            <TableCell>Wynik</TableCell>
            <TableCell>Data</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {players.map((player, index) => (
            <TableRow
              key={index}
              sx={{
                backgroundColor: index % 2 === 0 ? "#1976d2" : "transparent", // Color for even rows
                color: index % 2 === 0 ? "white" : "inherit", // Text color for even rows
              }}
            >
              <TableCell>{index + 1}</TableCell>
              <TableCell>{`${player.firstName} ${player.lastName}`}</TableCell>
              <TableCell>{player.username}</TableCell>
              <TableCell>{prizeMap[player.result]}</TableCell>
              {/* Mapping result to prize */}
              <TableCell>{player.date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default Ranking;
