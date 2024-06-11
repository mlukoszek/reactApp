import React, { useState, useEffect, useCallback } from "react";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchBar = ({ setRecipes }) => {
  const [query, setQuery] = useState("pizza");

  const fetchRecipes = useCallback(
    async (searchQuery) => {
      const response = await fetch(
        `https://api.edamam.com/search?q=${searchQuery}&app_id=e5917c72&app_key=6435a2af8d11d236447d84f4918b2fc2`,
      );
      const data = await response.json();
      setRecipes(data.hits);
    },
    [setRecipes],
  );

  useEffect(() => {
    fetchRecipes(query);
  }, []);

  function handleSearch(event) {
    setQuery(event.target.value);
  }

  function handleKeyPress(event) {
    if (event.key === "Enter") {
      fetchRecipes(query);
    }
  }

  function handleIconClick() {
    fetchRecipes(query);
  }

  return (
    <TextField
      value={query}
      onChange={handleSearch}
      onKeyPress={handleKeyPress}
      variant="outlined"
      label="Wyszukaj"
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={handleIconClick}>
              <SearchIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
      fullWidth
      style={{ marginTop: "100px" }}
    />
  );
};

export default SearchBar;
