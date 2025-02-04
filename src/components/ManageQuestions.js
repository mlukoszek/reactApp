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

const ManageQuestions = () => {
  const [questionBody, setQuestionBody] = useState("");
  const [answerA, setAnswerA] = useState("");
  const [answerB, setAnswerB] = useState("");
  const [answerC, setAnswerC] = useState("");
  const [answerD, setAnswerD] = useState("");
  const [rightAnswer, setRightAnswer] = useState("");
  const [difficulty, setDifficulty] = useState(1);
  const [allQuestions, setAllQuestions] = useState({});
  const [questionIdToDelete, setQuestionIdToDelete] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("");

  // Funkcja zapisująca pytanie
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
      const response = await fetch("http://localhost:8080/admin/addQuestion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
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

  // Funkcja pobierająca wszystkie pytania
  const fetchAllQuestions = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/admin/getAllQuestions",
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
        setAllQuestions(data);
      } else {
        alert("Błąd podczas pobierania pytań.");
      }
    } catch (error) {
      alert("Wystąpił błąd sieci: " + error.message);
    }
  };

  // Funkcja usuwająca pytanie
  const handleDeleteQuestion = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/admin/deleteQuestion",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ questionId: parseInt(questionIdToDelete) }),
        },
      );

      if (response.ok) {
        const result = await response.text();
        alert(`Sukces: ${result}`);
        fetchAllQuestions();
      } else {
        alert("Błąd podczas usuwania pytania.");
      }
    } catch (error) {
      alert("Wystąpił błąd sieci: " + error.message);
    }
  };

  // Funkcja filtrująca pytania po trudności
  const handleDifficultyFilter = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/admin/getQuestionsByDifficulty?difficulty=${difficultyFilter}`,
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
        setAllQuestions(data);
      } else {
        alert("Błąd podczas pobierania pytań.");
      }
    } catch (error) {
      alert("Wystąpił błąd sieci: " + error.message);
    }
  };

  return (
    <div>
      <Typography variant="h4" textAlign="center" gutterBottom>
        Zarządzanie pytaniami
      </Typography>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Dodaj pytanie</Typography>
        </AccordionSummary>
        <AccordionDetails>
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
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Przeglądaj pytania</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Button
            variant="contained"
            color="primary"
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
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Filtruj pytania po trudności</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TextField
            label="Trudność do wyszukania"
            fullWidth
            margin="normal"
            value={difficultyFilter}
            onChange={(e) => setDifficultyFilter(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleDifficultyFilter}
          >
            Wyszukaj według trudności
          </Button>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Usuń pytanie</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TextField
            label="ID pytania do usunięcia"
            fullWidth
            margin="normal"
            value={questionIdToDelete}
            onChange={(e) => setQuestionIdToDelete(e.target.value)}
          />
          <Button
            variant="contained"
            color="error"
            fullWidth
            onClick={handleDeleteQuestion}
          >
            Usuń pytanie
          </Button>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default ManageQuestions;
