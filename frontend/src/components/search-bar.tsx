import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  loading?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  placeholder = "搜索诗词、作者或内容...",
  loading = false,
}) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        gap: 2,
        maxWidth: 600,
        mx: "auto",
        alignItems: "center",
      }}
    >
      <TextField
        fullWidth
        variant="outlined"
        placeholder={placeholder}
        value={query}
        onChange={handleInputChange}
        disabled={loading}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon color="action" />
            </InputAdornment>
          ),
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            backgroundColor: "background.paper",
            "& fieldset": {
              borderColor: "divider",
            },
            "&:hover fieldset": {
              borderColor: "primary.main",
            },
          },
        }}
      />
      <Button
        type="submit"
        variant="contained"
        disabled={loading || !query.trim()}
        sx={{
          minWidth: 100,
          height: 56,
        }}
      >
        {loading ? <CircularProgress size={24} color="inherit" /> : "搜索"}
      </Button>
    </Box>
  );
};

export default SearchBar;
