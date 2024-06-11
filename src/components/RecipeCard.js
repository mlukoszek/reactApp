import React from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import "../App.css";

function RecipeCard({ recipe, onClick }) {
  return (
    <Card className="recipe-card" onClick={onClick}>
      <CardActionArea>
        <CardMedia component="img" image={recipe.image} alt={recipe.label} />
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {recipe.label}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Source: {recipe.source}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default RecipeCard;
