import React, { useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Button,
  TextField,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function ManageUsers() {
  const [userIdToActivate, setUserIdToActivate] = useState("");
  const [userIdToDeactivate, setUserIdToDeactivate] = useState("");
  const [userIdToDelete, setUserIdToDelete] = useState("");
  const [userNameToSearch, setUserNameToSearch] = useState("");
  const [foundUser, setFoundUser] = useState(null);
  const [searchError, setSearchError] = useState(null); // Dodajemy stan dla błędu wyszukiwania

  const handleActivateUser = async () => {
    try {
      const response = await fetch("http://localhost:8080/admin/activateUser", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ userId: userIdToActivate }),
      });

      if (response.ok) {
        const result = await response.text();
        alert(`Sukces: ${result}`);
      } else {
        alert("Błąd podczas aktywacji użytkownika.");
      }
    } catch (error) {
      alert("Wystąpił błąd sieci: " + error.message);
    }
  };

  const handleDeactivateUser = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/admin/deactivateUser",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ userId: userIdToDeactivate }),
        },
      );

      if (response.ok) {
        const result = await response.text();
        alert(`Sukces: ${result}`);
      } else {
        alert("Błąd podczas dezaktywacji użytkownika.");
      }
    } catch (error) {
      alert("Wystąpił błąd sieci: " + error.message);
    }
  };

  const handleDeleteUser = async () => {
    try {
      const response = await fetch("http://localhost:8080/admin/deleteUser", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ userId: userIdToDelete }),
      });

      if (response.ok) {
        const result = await response.text();
        alert(`Sukces: ${result}`);
      } else {
        alert("Błąd podczas usuwania użytkownika.");
      }
    } catch (error) {
      alert("Wystąpił błąd sieci: " + error.message);
    }
  };

  const handleSearchUser = async () => {
    setSearchError(null); // Resetujemy błąd przed wyszukiwaniem
    try {
      const response = await fetch(
        `http://localhost:8080/admin/searchUser?username=${userNameToSearch}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        },
      );

      if (response.ok) {
        const data = await response.json();
        setFoundUser(data);
      } else if (response.status === 404) {
        setFoundUser(null);
        setSearchError("Nie znaleziono użytkownika."); // Ustawiamy komunikat o braku użytkownika
      } else {
        alert("Błąd podczas wyszukiwania użytkownika.");
        setFoundUser(null);
      }
    } catch (error) {
      alert("Wystąpił błąd sieci: " + error.message);
      setFoundUser(null);
    }
  };

  return (
    <div>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Obsługa użytkowników</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="h6">Zarządzaj użytkownikami</Typography>

          <TextField
            label="ID do aktywacji"
            fullWidth
            margin="normal"
            value={userIdToActivate}
            onChange={(e) => setUserIdToActivate(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleActivateUser}
          >
            Aktywuj użytkownika
          </Button>

          <TextField
            label="ID do dezaktywacji"
            fullWidth
            margin="normal"
            value={userIdToDeactivate}
            onChange={(e) => setUserIdToDeactivate(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleDeactivateUser}
          >
            Dezaktywuj użytkownika
          </Button>
          <TextField
            label="Nazwa użytkownika do wyszukania"
            fullWidth
            margin="normal"
            value={userNameToSearch}
            onChange={(e) => setUserNameToSearch(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleSearchUser}
          >
            Wyszukaj użytkownika
          </Button>
          <TextField
            label="ID do usunięcia"
            fullWidth
            margin="normal"
            value={userIdToDelete}
            onChange={(e) => setUserIdToDelete(e.target.value)}
          />
          <Button
            variant="contained"
            color="error"
            fullWidth
            onClick={handleDeleteUser}
          >
            Usuń użytkownika
          </Button>

          {foundUser && (
            <div id="userDetails">
              <Typography variant="h6">Dane użytkownika:</Typography>
              <Typography>Imię: {foundUser.firstName}</Typography>
              <Typography>Nazwisko: {foundUser.lastName}</Typography>
              <Typography>Email: {foundUser.email}</Typography>
              <Typography>Username: {foundUser.username}</Typography>
              {/* ... wyświetl inne pola */}
            </div>
          )}
          {searchError && ( // Wyświetlamy komunikat o błędzie, jeśli istnieje
            <div id="userDetails" style={{ color: "red" }}>
              <Typography variant="h6">{searchError}</Typography>
            </div>
          )}
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default ManageUsers;
