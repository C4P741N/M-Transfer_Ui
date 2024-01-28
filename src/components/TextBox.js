import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React from "react";

const TextBox = ({ label, value, onChange, error, dataType, onFocus, onBlur }) => {
  return (
    <TextField
      label={label}
      variant="outlined"
      fullWidth
      type={dataType}
      margin="normal"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      error={Boolean(error)}
      helperText={error}
      onFocus={() => onFocus()}
      onBlur={() => onBlur()}
      sx={{
        "& input": {
          fontSize: "25px",
        },
        "& label": {
          fontSize: "18px",
        },
        "& .MuiFormHelperText-root": {
          fontSize: "20px",
        },
      }}
    />
  );
};

export default TextBox;
