import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";

const Dropdown = ({ label, value, options, onChange }) => {
  return (
    <FormControl
      // variant="filled"
      variant="outlined"
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
        width: 300,
        height: 70,
      }}
      // autoWidth
      required
    >
      <InputLabel shrink>{label}</InputLabel>
      <Select label={label} value={value} onChange={onChange}  sx={{ fontSize: 20 }}>

      {options.map((op) => (
        <MenuItem value={op.value} key={op.value} sx={{ fontSize: 20 }}>{op.label}</MenuItem>
      ))}
      </Select>
    </FormControl>
  );
};

export default Dropdown;
