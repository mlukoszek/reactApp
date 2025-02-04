import React from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from "@mui/material";

const ProgressTable = ({ difficulty }) => {
  const levels = [
    1000000, 500000, 250000, 125000, 75000, 50000, 25000, 15000, 10000, 5000,
    2000, 1000,
  ];

  return (
    <Box
      sx={{
        position: "absolute",
        right: 120,
        top: "50%",
        transform: "translateY(-50%)",
        bgcolor: "#1976d2",
        color: "white",
        p: 2,
        borderRadius: 2,
        boxShadow: 3,
        width: "auto",
      }}
    >
      <Typography variant="h6" align="center" gutterBottom>
        Poziom trudności
      </Typography>
      <TableContainer component={Paper} sx={{ bgcolor: "transparent" }}>
        <Table>
          <TableBody>
            {levels.map((level) => (
              <TableRow
                key={level}
                sx={{
                  bgcolor:
                    difficulty >= levels.indexOf(level) + 1
                      ? "#4caf50"
                      : "transparent",
                }}
              >
                <TableCell
                  sx={{
                    color:
                      difficulty >= levels.indexOf(level) + 1
                        ? "white"
                        : "white",
                    textAlign: "center",
                    fontWeight:
                      difficulty >= levels.indexOf(level) + 1
                        ? "bold"
                        : "normal",
                    padding: "5px 10px",
                  }}
                >
                  {level.toLocaleString("pl-PL", {
                    style: "currency",
                    currency: "PLN",
                  })}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ProgressTable;
