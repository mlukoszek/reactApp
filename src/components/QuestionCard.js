import React, { useState } from "react";
import { Button, Typography, Grid, Box } from "@mui/material";
import Lifelines from "./Lifelines";

const QuestionCard = ({ questionData: initialQuestionData }) => {
  const [questionData, setQuestionData] = useState(initialQuestionData);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [responseMessage, setResponseMessage] = useState("");
  const [resetVoting, setResetVoting] = useState(false);

  const [usedAudienceVote, setUsedAudienceVote] = useState(false);
  const [usedFiftyFifty, setUsedFiftyFifty] = useState(false);
  const [usedPhoneAFriend, setUsedPhoneAFriend] = useState(false);

  if (!questionData) {
    return (
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <Typography variant="h4">WELCOME TO MILIONERZY</Typography>
      </Box>
    );
  }

  const {
    questionId,
    questionBody,
    answerA,
    answerB,
    answerC,
    answerD,
    difficulty,
    rightAnswer,
  } = questionData;

  const handleAnswerClick = (letter) => {
    setSelectedAnswer(letter);
  };

  const handleCheckAnswer = async () => {
    if (!selectedAnswer) {
      alert("Proszę wybrać odpowiedź przed sprawdzeniem.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/response", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          userAnswer: selectedAnswer,
          correctAnswer: rightAnswer,
          difficulty: difficulty,
        }),
      });

      if (!response.ok) {
        throw new Error("Błąd podczas sprawdzania odpowiedzi");
      }

      const data = await response.json();
      setResponseMessage(data.result);
    } catch (error) {
      console.error("Wystąpił błąd:", error);
      setResponseMessage("Wystąpił błąd podczas sprawdzania odpowiedzi.");
    }
  };

  const handleDrawQuestion = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/drawQuestion?difficulty=${difficulty}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        },
      );

      if (!response.ok) {
        throw new Error("Błąd podczas losowania pytania");
      }

      const newQuestionData = await response.json();
      setQuestionData(newQuestionData);
      setSelectedAnswer(null);
      setResponseMessage("");
      setResetVoting(true);
      setTimeout(() => setResetVoting(false), 100);
    } catch (error) {
      console.error("Wystąpił błąd:", error);
    }
  };

  return (
    <Box sx={{ textAlign: "center", mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        Pytanie nr. {difficulty}
      </Typography>
      <Typography variant="h5" gutterBottom>
        {questionBody}
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Box>
            {answerA && (
              <Button
                variant="contained"
                color={selectedAnswer === "A" ? "success" : "primary"}
                sx={{ mb: 1 }}
                fullWidth
                onClick={() => handleAnswerClick("A")}
              >
                <Typography variant="body1">A. {answerA}</Typography>
              </Button>
            )}
            {answerB && (
              <Button
                variant="contained"
                color={selectedAnswer === "B" ? "success" : "primary"}
                sx={{ mb: 1 }}
                fullWidth
                onClick={() => handleAnswerClick("B")}
              >
                <Typography variant="body1">B. {answerB}</Typography>
              </Button>
            )}
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box>
            {answerC && (
              <Button
                variant="contained"
                color={selectedAnswer === "C" ? "success" : "primary"}
                sx={{ mb: 1 }}
                fullWidth
                onClick={() => handleAnswerClick("C")}
              >
                <Typography variant="body1">C. {answerC}</Typography>
              </Button>
            )}
            {answerD && (
              <Button
                variant="contained"
                color={selectedAnswer === "D" ? "success" : "primary"}
                sx={{ mb: 1 }}
                fullWidth
                onClick={() => handleAnswerClick("D")}
              >
                <Typography variant="body1">D. {answerD}</Typography>
              </Button>
            )}
          </Box>
        </Grid>
      </Grid>

      {responseMessage === "" && (
        <Button
          variant="contained"
          color="secondary"
          sx={{ mt: 2 }}
          onClick={handleCheckAnswer}
        >
          Sprawdź moją odpowiedź
        </Button>
      )}

      {responseMessage && (
        <Box sx={{ mt: 2 }}>
          {responseMessage === "Odpowiedź jest błędna" ? (
            <Box
              sx={{
                backgroundColor: "red",
                color: "white",
                p: 1,
                borderRadius: 1,
                display: "inline-block",
              }}
            >
              <Typography variant="h4">KONIEC GRY</Typography>
            </Box>
          ) : responseMessage === "Odpowiedź jest poprawna" ? (
            <Button
              variant="contained"
              color="secondary"
              sx={{ mt: 2 }}
              onClick={handleDrawQuestion}
            >
              Wylosuj kolejne pytanie
            </Button>
          ) : null}
          <Typography variant="h6">{responseMessage}</Typography>
        </Box>
      )}

      <Lifelines
        color="primary"
        questionId={questionId}
        resetVoting={resetVoting}
        usedAudienceVote={usedAudienceVote}
        usedFiftyFifty={usedFiftyFifty}
        usedPhoneAFriend={usedPhoneAFriend}
        setUsedAudienceVote={setUsedAudienceVote}
        setUsedFiftyFifty={setUsedFiftyFifty}
        setUsedPhoneAFriend={setUsedPhoneAFriend}
        updateQuestionData={setQuestionData}
      />

      <Box sx={{ mt: 4 }}>
        <img
          src={`${process.env.PUBLIC_URL}/urbanski.jpg`}
          alt="Urbanski"
          style={{ width: "600px", height: "auto" }}
        />
      </Box>
    </Box>
  );
};

export default QuestionCard;
