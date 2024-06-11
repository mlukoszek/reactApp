import React from "react";
import { Grid } from "@mui/material";
import RecipeCard from "./RecipeCard";

function RecipeList({ recipes, onRecipeSelect }) {
  return (
    <Grid container spacing={2}>
      {recipes.map((recipe) => (
        <Grid key={recipe.recipe.uri} item xs={12} sm={6} md={4} lg={3}>
          <div
            style={{ display: "flex", flexDirection: "column", height: "100%" }}
          >
            <RecipeCard
              recipe={recipe.recipe}
              onClick={() => onRecipeSelect(recipe.recipe)}
            />
          </div>
        </Grid>
      ))}
    </Grid>
  );
}

export default RecipeList;
