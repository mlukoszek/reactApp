import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

function MyAccount() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/api/getMyDetails", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Błąd pobierania danych");
        }
        return response.json();
      })
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Ładowanie danych...</div>;
  }

  if (error) {
    return <div>Błąd: {error}</div>;
  }

  if (!user) {
    return <div>Brak danych użytkownika</div>;
  }

  const roleMap = {
    ADMIN: "Administrator",
    USER: "Zwykły użytkownik",
  };

  const handleEdit = () => {
    alert("Edytuj dane - funkcjonalność w budowie");
  };

  const handleChangePassword = () => {
    alert("Zmień hasło - funkcjonalność w budowie");
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ width: "100%" }} aria-label="user details table">
          <TableHead>
            <TableRow>
              <TableCell>Imię</TableCell>
              <TableCell>Nazwisko</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Wiek</TableCell>
              <TableCell>Typ konta</TableCell>
              <TableCell>Data rejestracji</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>{user.firstName}</TableCell>
              <TableCell>{user.lastName}</TableCell>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.age}</TableCell>
              <TableCell>{roleMap[user.role] || "Nieznana rola"}</TableCell>
              <TableCell>{user.registrationDate}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Stack direction="row" spacing={2} sx={{ marginTop: 2 }}>
        <Button variant="contained" color="primary" onClick={handleEdit}>
          Edytuj dane
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleChangePassword}
        >
          Zmień hasło
        </Button>
      </Stack>
    </>
  );
}

export default MyAccount;
