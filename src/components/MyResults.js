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
            <TableRow key={index}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{`${player.firstName} ${player.lastName}`}</TableCell>
              <TableCell>{player.username}</TableCell>
              <TableCell>{player.result}</TableCell>
              <TableCell>{player.date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default Ranking;
