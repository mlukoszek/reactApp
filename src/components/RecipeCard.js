import React from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

//Komponent RecipeCard przyjmuje propsy recipe i onClick
function RecipeCard({ recipe, onClick }) {
  return (
    //Karta wyświetlająca pojedynczy przepis
    <Card onClick={onClick}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="200"
          image={recipe.image}
          alt={recipe.label}
        />
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
