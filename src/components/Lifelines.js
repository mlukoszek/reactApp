import React, { useState, useEffect } from "react";
import { Button, Typography, Box } from "@mui/material";

const Lifelines = ({
  color = "primary",
  questionId,
  resetVoting,
  usedAudienceVote,
  usedFiftyFifty,
  usedPhoneAFriend,
  setUsedAudienceVote,
  setUsedFiftyFifty,
  setUsedPhoneAFriend,
  updateQuestionData,
}) => {
  const [audienceVotes, setAudienceVotes] = useState(null);

  // Resetowanie wyników głosowania, gdy resetVoting zmienia się na true
  useEffect(() => {
    if (resetVoting) {
      setAudienceVotes(null);
    }
  }, [resetVoting]);

  const handleAudienceVote = async () => {
    if (!questionId) {
      alert("Brak pytania do głosowania.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8080/api/audienceVote?questionId=${questionId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (!response.ok) {
        throw new Error("Błąd podczas wysyłania głosowania publiczności.");
      }

      const data = await response.json();
      setAudienceVotes(data); // Ustawienie wyników głosowania
      setUsedAudienceVote(true); // Koło zostało użyte
    } catch (error) {
      console.error("Wystąpił błąd:", error);
    }
  };

  const handleFiftyFifty = async () => {
    if (!questionId) {
      alert("Brak pytania do aktywacji pół na pół.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8080/api/fiftyFifty?questionId=${questionId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (!response.ok) {
        throw new Error("Błąd podczas aktywacji pół na pół.");
      }
      const data = await response.json();
      setUsedFiftyFifty(true); // Koło zostało użyte
      updateQuestionData(data);
    } catch (error) {
      console.error("Wystąpił błąd:", error);
    }
  };

  const handlePhoneAFriend = () => {
    setUsedPhoneAFriend(true); // Koło zostało użyte
  };

  return (
    <Box sx={{ textAlign: "center", mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        Koła ratunkowe:
      </Typography>
      {audienceVotes && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="body1" gutterBottom>
            Wyniki głosowania publiczności:
          </Typography>
          <Typography variant="body1" gutterBottom>
            A: {audienceVotes.a || 0} głosów, B: {audienceVotes.b || 0} głosów,
            C: {audienceVotes.c || 0} głosów, D: {audienceVotes.d || 0} głosów.
          </Typography>
        </Box>
      )}

      <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 2 }}>
        <Button
          variant="contained"
          color={color}
          onClick={handleAudienceVote}
          disabled={usedAudienceVote} // Koło wyłączone po użyciu
        >
          <span
            style={{
              textDecoration: usedAudienceVote ? "line-through" : "none",
            }}
          >
            Głosowanie publiczności
          </span>
        </Button>

        <Button
          variant="contained"
          color={color}
          onClick={handleFiftyFifty}
          disabled={usedFiftyFifty} // Koło wyłączone po użyciu
        >
          <span
            style={{
              textDecoration: usedFiftyFifty ? "line-through" : "none",
            }}
          >
            Pół na pół
          </span>
        </Button>

        <Button
          variant="contained"
          color={color}
          onClick={handlePhoneAFriend}
          disabled={usedPhoneAFriend} // Koło wyłączone po użyciu
        >
          <span
            style={{
              textDecoration: usedPhoneAFriend ? "line-through" : "none",
            }}
          >
            Telefon do przyjaciela
          </span>
        </Button>
      </Box>
    </Box>
  );
};

export default Lifelines;
