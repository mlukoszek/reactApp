import React, { useState } from "react";
import { Container, Box } from "@mui/material";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import RecipeList from "./components/RecipeList";
import RecipeDetails from "./components/RecipeDetails";

function App() {
  const [recipes, setRecipes] = useState([]);

  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const handleRecipeSelect = (recipe) => {
    setSelectedRecipe(recipe);
  };

  const handleCloseDetails = () => {
    setSelectedRecipe("");
  };

  return (
    <Container>
      <Header />
      <Box mt={2}>
        <SearchBar setRecipes={setRecipes} />
      </Box>
      <Box mt={2}>
        <RecipeList recipes={recipes} onRecipeSelect={handleRecipeSelect} />
      </Box>
      {selectedRecipe && (
        <RecipeDetails
          open={Boolean(selectedRecipe)}
          onClose={handleCloseDetails}
          recipe={selectedRecipe}
        />
      )}
    </Container>
  );
}

export default App;
