import React, { useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function AdminPanel() {
  const [questionBody, setQuestionBody] = useState("");
  const [answerA, setAnswerA] = useState("");
  const [answerB, setAnswerB] = useState("");
  const [answerC, setAnswerC] = useState("");
  const [answerD, setAnswerD] = useState("");
  const [rightAnswer, setRightAnswer] = useState("");
  const [difficulty, setDifficulty] = useState(1);
  const [allQuestions, setAllQuestions] = useState({});
  const [questionIdToDelete, setQuestionIdToDelete] = useState("");

  const handleSaveQuestion = async () => {
    const questionDto = {
      questionBody,
      answerA,
      answerB,
      answerC,
      answerD,
      rightAnswer,
      difficulty,
    };

    try {
      const response = await fetch("/addQuestion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(questionDto),
      });

      if (response.ok) {
        const result = await response.text();
        alert(`Sukces: ${result}`);
      } else {
        alert("Błąd podczas zapisu pytania.");
      }
    } catch (error) {
      alert("Wystąpił błąd sieci: " + error.message);
    }
  };

  const fetchAllQuestions = async () => {
    try {
      const response = await fetch("http://localhost:8080/getAllQuestions", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setAllQuestions(data);
      } else {
        alert("Błąd podczas pobierania pytań.");
      }
    } catch (error) {
      alert("Wystąpił błąd sieci: " + error.message);
    }
  };

  const handleDeleteQuestion = async () => {
    try {
      const response = await fetch("http://localhost:8080/deleteQuestion", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ questionId: parseInt(questionIdToDelete) }),
      });

      if (response.ok) {
        const result = await response.text();
        alert(`Sukces: ${result}`);
        fetchAllQuestions(); // Ponownie pobierz pytania, aby zaktualizować listę
      } else {
        alert("Błąd podczas usuwania pytania.");
      }
    } catch (error) {
      alert("Wystąpił błąd sieci: " + error.message);
    }
  };

  return (
    <div>
      <Typography variant="h4" textAlign="center" gutterBottom>
        Panel Administratora
      </Typography>

      {/* Question Management */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Obsługa pytań</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="h6">Dodaj pytanie</Typography>
          <TextField
            label="Treść pytania"
            fullWidth
            multiline
            rows={3}
            margin="normal"
            value={questionBody}
            onChange={(e) => setQuestionBody(e.target.value)}
          />
          <TextField
            label="Odpowiedź A"
            fullWidth
            margin="normal"
            value={answerA}
            onChange={(e) => setAnswerA(e.target.value)}
          />
          <TextField
            label="Odpowiedź B"
            fullWidth
            margin="normal"
            value={answerB}
            onChange={(e) => setAnswerB(e.target.value)}
          />
          <TextField
            label="Odpowiedź C"
            fullWidth
            margin="normal"
            value={answerC}
            onChange={(e) => setAnswerC(e.target.value)}
          />
          <TextField
            label="Odpowiedź D"
            fullWidth
            margin="normal"
            value={answerD}
            onChange={(e) => setAnswerD(e.target.value)}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Poprawna odpowiedź</InputLabel>
            <Select
              value={rightAnswer}
              onChange={(e) => setRightAnswer(e.target.value)}
            >
              <MenuItem value="A">A</MenuItem>
              <MenuItem value="B">B</MenuItem>
              <MenuItem value="C">C</MenuItem>
              <MenuItem value="D">D</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>Trudność pytania</InputLabel>
            <Select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
            >
              {[...Array(12).keys()].map((num) => (
                <MenuItem key={num + 1} value={num + 1}>
                  {num + 1}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSaveQuestion}
          >
            Zapisz pytanie
          </Button>

          <Typography variant="h6" marginTop={3}>
            Przeglądaj pytania
          </Typography>
          <Button
            variant="outlined"
            color="info"
            fullWidth
            onClick={fetchAllQuestions}
          >
            Pokaż wszystkie pytania
          </Button>
          {Object.entries(allQuestions).length > 0 && (
            <ul>
              {Object.entries(allQuestions).map(([id, body]) => (
                <li key={id}>
                  <strong>ID {id}:</strong> {body}
                </li>
              ))}
            </ul>
          )}

          <TextField label="Trudność do wyszukania" fullWidth margin="normal" />
          <Button variant="outlined" color="info" fullWidth>
            Wyszukaj według trudności
          </Button>
          <TextField
            label="ID pytania do usunięcia"
            fullWidth
            margin="normal"
            value={questionIdToDelete}
            onChange={(e) => setQuestionIdToDelete(e.target.value)}
          />
          <Button
            variant="outlined"
            color="error"
            fullWidth
            onClick={handleDeleteQuestion}
          >
            Usuń pytanie
          </Button>
        </AccordionDetails>
      </Accordion>

      {/* User Management */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Obsługa użytkowników</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="h6">Zarządzaj użytkownikami</Typography>
          <Button variant="outlined" color="info" fullWidth>
            Przeglądaj użytkowników
          </Button>
          <TextField label="ID do aktywacji" fullWidth margin="normal" />
          <Button variant="outlined" color="warning" fullWidth>
            Aktywuj użytkownika
          </Button>
          <TextField label="ID do dezaktywacji" fullWidth margin="normal" />
          <Button variant="outlined" color="secondary" fullWidth>
            Dezaktywuj użytkownika
          </Button>
          <TextField label="ID do usunięcia" fullWidth margin="normal" />
          <Button variant="outlined" color="error" fullWidth>
            Usuń użytkownika
          </Button>
          <TextField
            label="Nazwa użytkownika do wyszukania"
            fullWidth
            margin="normal"
          />
          <Button variant="outlined" color="primary" fullWidth>
            Wyszukaj użytkownika
          </Button>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default AdminPanel;
