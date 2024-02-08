import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";

function SearchField({ setSearchInput, searchInput }) {
  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 1 },
      }}
      noValidate
      autoComplete="off"
    >
      <Box sx={{ display: "flex", alignItems: "flex-end" }}>
        <TextField
          id="outlined-basic"
          label="Search"
          variant="outlined"
          onChange={setSearchInput}
          // value={searchInput}
          InputProps={{
            startAdornment: <SearchIcon />,
          }}
        />
      </Box>
    </Box>
  );
}

export default SearchField;
