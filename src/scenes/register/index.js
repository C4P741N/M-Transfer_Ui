import React, { useState } from "react";
import { Box, Button, TextField, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";

const RegistrationForm = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});

  const handleRegistration = () => {
    // Implement your registration logic here
    // For simplicity, let's perform basic validation

    const newErrors = {};

    if (!username.trim()) {
      newErrors.username = "Username is required";
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
    }

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!isValidEmail(email)) {
      newErrors.email = "Invalid email format";
    }

    if (Object.keys(newErrors).length === 0) {
      // Proceed with registration if no errors
      // Implement your registration logic here
    } else {
      // Update errors state if validation fails
      setErrors(newErrors);
    }
  };

  const isValidEmail = (value) => {
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      backgroundColor={colors.primary[400]}
    >
      <Typography
        variant="h4"
        fontWeight="bold"
        color={colors.grey[100]}
        mb={4}
      >
        Registration
      </Typography>
      <Box
        width={300}
        p={3}
        borderRadius={4}
        boxShadow={3}
        bgcolor={colors.primary[500]}
      >
        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          error={Boolean(errors.username)}
          helperText={errors.username}
        />
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={Boolean(errors.password)}
          helperText={errors.password}
        />
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={Boolean(errors.email)}
          helperText={errors.email}
        />
        <Button
          variant="contained"
          color="secondary"
          fullWidth
          size="large"
          onClick={handleRegistration}
          mt={2}
          sx={{
            fontSize: "18px",
            color: "white",
          }}
        >
          Register
        </Button>
      </Box>
    </Box>
  );
};

export default RegistrationForm;
