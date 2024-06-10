import React, { useState } from "react";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("pizza");

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      onSearch(query.trim());
    }
  };

  const handleSearchIconClick = () => {
    onSearch(query.trim());
  };

  return (
    <TextField
      fullWidth
      variant="outlined"
      defaultValue={"pizza"}
      label="Wyszukaj"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      onKeyPress={handleKeyPress}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={handleSearchIconClick}>
              <SearchIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
      style={{ marginTop: "100px" }}
    />
  );
}

export default SearchBar;
