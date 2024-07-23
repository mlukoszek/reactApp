import React from "react";
import {
  Container,
  Card,
  CardContent,
  Typography,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Button,
  Box,
} from "@mui/material";

const QuestionCard = ({ token }) => {
  const handleAnswerSubmit = (e) => {
    e.preventDefault();
    // Handle answer submission
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Card sx={{ maxWidth: "60%", margin: "0 auto" }}>
        <CardContent>
          <Typography
            variant="h5"
            gutterBottom
            className="question-text"
            sx={{ fontSize: "1.2rem" }}
          >
            Pytanie:
          </Typography>
          <Typography
            variant="body1"
            className="question-text"
            sx={{ fontSize: "0.875rem" }}
          >
            Jaka jest stolica Francji?
          </Typography>
          <form onSubmit={handleAnswerSubmit}>
            <FormControl component="fieldset">
              <RadioGroup name="answer">
                <Box display="flex" flexDirection="column" mb={2}>
                  <FormControlLabel
                    control={<Radio />}
                    label="A. Paryż"
                    value="A"
                    className="answer-text"
                    sx={{ fontSize: "0.875rem" }}
                  />
                  <FormControlLabel
                    control={<Radio />}
                    label="B. Londyn"
                    value="B"
                    className="answer-text"
                    sx={{ fontSize: "0.875rem" }}
                  />
                  <FormControlLabel
                    control={<Radio />}
                    label="C. Madryt"
                    value="C"
                    className="answer-text"
                    sx={{ fontSize: "0.875rem" }}
                  />
                  <FormControlLabel
                    control={<Radio />}
                    label="D. Rzym"
                    value="D"
                    className="answer-text"
                    sx={{ fontSize: "0.875rem" }}
                  />
                </Box>
                <Box textAlign="center" mt={4}>
                  <Button type="submit" variant="contained" color="primary">
                    Odpowiadam...
                  </Button>
                </Box>
              </RadioGroup>
            </FormControl>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};

export default QuestionCard;
