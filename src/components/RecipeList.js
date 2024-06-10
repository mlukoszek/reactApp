import React from "react";
import { Grid } from "@mui/material";
import RecipeCard from "./RecipeCard";

function RecipeList({ recipes, onRecipeSelect }) {
  return (
    // Wyświetla listę przepisów w siatce
    <Grid container spacing={2}>
      {recipes.map((recipe) => (
        <Grid key={recipe.recipe.uri} item xs={12} sm={6} md={4} lg={3}>
          <RecipeCard
            recipe={recipe.recipe}
            onClick={() => onRecipeSelect(recipe.recipe)}
          />
        </Grid>
      ))}
    </Grid>
  );
}

export default RecipeList;
