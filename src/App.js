import React, { useState } from "react";
import { Container, Box } from "@mui/material";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import RecipeList from "./components/RecipeList";
import RecipeDetails from "./components/RecipeDetails";

function App() {
  //Stan przechowujący listę przepisów
  const [recipes, setRecipes] = useState([]);
  //Stan przechowujący aktualnie wybrany przepis
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  //Funkcja obsługująca wyszukiwanie przepisów
  const handleSearch = async (query) => {
    const response = await fetch(
      `https://api.edamam.com/search?q=${query}&app_id=e5917c72&app_key=6435a2af8d11d236447d84f4918b2fc2`,
    );
    const data = await response.json();
    setRecipes(data.hits);
  };

  //Funkcja obsługująca wybór przepisu
  const handleRecipeSelect = (recipe) => {
    setSelectedRecipe(recipe);
  };

  // Funkcja zamykająca szczegóły przepisu
  const handleCloseDetails = () => {
    setSelectedRecipe("");
  };

  return (
    <Container>
      <Header />
      <Box mt={2}>
        <SearchBar onSearch={handleSearch} />
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
