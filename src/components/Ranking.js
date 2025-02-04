import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

// Przykładowe dane graczy
const players = [
  {
    name: "Jan Kowalski",
    username: "Janek123",
    age: 25,
    score: 150,
    date: "2023-10-27",
  },
  {
    name: "Anna Nowak",
    username: "AniaNowak",
    age: 30,
    score: 120,
    date: "2023-10-27",
  },
  {
    name: "Piotr Wiśniewski",
    username: "Piotrek98",
    age: 22,
    score: 100,
    date: "2023-10-27",
  },
];

function Ranking() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ width: "100%" }} aria-label="player ranking table">
        <TableHead>
          <TableRow>
            <TableCell>Miejsce</TableCell>
            <TableCell>Imię i Nazwisko</TableCell>
            <TableCell>Username</TableCell>
            <TableCell>Wiek</TableCell>
            <TableCell>Wynik</TableCell>
            <TableCell>Data</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {players.map((player, index) => (
            <TableRow
              key={player.username}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {index + 1} {/* Miejsce jest generowane automatycznie */}
              </TableCell>
              <TableCell>{player.name}</TableCell>
              <TableCell>{player.username}</TableCell>
              <TableCell>{player.age}</TableCell>
              <TableCell>{player.score}</TableCell>
              <TableCell>{player.date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default Ranking;
