import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";

const Dropdown = ({ label, value, options, onChange }) => {
  return (
    <FormControl
      variant="filled"
      sx={{
        // marginTop: 35,
        width: 400,
        height: 70,
      }}
      autoWidth
      required
    >
      <InputLabel shrink>{label}</InputLabel>
      <Select label={label} value={value} onChange={onChange}  sx={{ fontSize: 25 }}>

      {options.map((op) => (
        <MenuItem value={op.value} sx={{ fontSize: 25 }}>{op.label}</MenuItem>
      ))}
      </Select>
    </FormControl>
  );
};

export default Dropdown;
