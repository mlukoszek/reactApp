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
  const [friendCallResponse, setFriendCallResponse] = useState(null);

  useEffect(() => {
    if (resetVoting) {
      setAudienceVotes(null);
      setFriendCallResponse(null);
    }
  }, [resetVoting]);

  const handleAudienceVote = async () => {
    if (!questionId || usedAudienceVote) return;

    try {
      const response = await fetch(
        `http://localhost:8080/api/audienceVote?questionId=${questionId}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        },
      );

      if (!response.ok)
        throw new Error("Błąd podczas głosowania publiczności.");

      const data = await response.json();
      setAudienceVotes(data);
      setUsedAudienceVote(true);
    } catch (error) {
      console.error("Błąd głosowania publiczności:", error);
    }
  };

  const handleFiftyFifty = async () => {
    if (!questionId || usedFiftyFifty) return;

    try {
      const response = await fetch(
        `http://localhost:8080/api/fiftyFifty?questionId=${questionId}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        },
      );

      if (!response.ok) throw new Error("Błąd podczas pół na pół.");
      const data = await response.json();
      setUsedFiftyFifty(true);
      updateQuestionData(data);
    } catch (error) {
      console.error("Błąd pół na pół:", error);
    }
  };

  const handlePhoneAFriend = async () => {
    if (!questionId || usedPhoneAFriend) return;

    try {
      const response = await fetch(
        `http://localhost:8080/api/friendCall?questionId=${questionId}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        },
      );

      if (!response.ok) throw new Error("Błąd telefonu do przyjaciela.");
      const message = await response.text();
      setFriendCallResponse(message);
      setUsedPhoneAFriend(true);
    } catch (error) {
      console.error("Błąd telefonu do przyjaciela:", error);
    }
  };

  return (
    <Box sx={{ textAlign: "center", mt: 4 }}>
      <Typography variant="h6">Koła ratunkowe:</Typography>
      {audienceVotes && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="body1">
            Głosowanie: A: {audienceVotes.a}%, B: {audienceVotes.b}%, C:
            {audienceVotes.c}%, D: {audienceVotes.d}%.
          </Typography>
        </Box>
      )}
      {friendCallResponse && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="body1">
            Odpowiedź przyjaciela: {friendCallResponse}
          </Typography>
        </Box>
      )}
      <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 2 }}>
        <Button
          variant="contained"
          color={color}
          onClick={handleAudienceVote}
          disabled={usedAudienceVote}
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
          disabled={usedFiftyFifty}
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
          disabled={usedPhoneAFriend}
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
