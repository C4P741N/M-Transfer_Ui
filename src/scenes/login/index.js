import React, { useState } from "react";
import { Box, Button, TextField, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import axios from "../../api/axios";
import { EnumsFactory } from "../../data/utilsAtLarge";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useEffect } from "react";

const LOGIN_URL = "auth/authenticate";

const LoginScreen = () => {
  const userRef = useRef();
  const errRef = useRef();

  const navigate = useNavigate();

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const { setAuth } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({
          user: username,
          pwd: password,
          authType: EnumsFactory.EnumsAtLarge.AuthTypes.Authentication,
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      const accessToken = response?.data?.token;
      const roles = response?.data?.roles;
      const expiration = response?.data?.expiration;
      setAuth({ roles, accessToken, expiration });
      setUsername("");
      setPassword("");
      navigate("/", { replace: true });
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
    }
  };

  useEffect(() => {
    setErrMsg("");
  }, [username, password]);

  const isFormValid = () => {
    return username.trim() !== "" && password.trim() !== "";
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      backgroundColor={colors.primary[500]}
    >
      <Typography
        variant="h4"
        fontWeight="bold"
        color={colors.grey[100]}
        mb={4}
      >
        Login
      </Typography>
      {errMsg && (
        <Typography
          variant="h4"
          fontWeight="bold"
          color={colors.grey[100]}
          mb={4}
          sx={{
            color: "red",
          }}
        >
          {errMsg}
        </Typography>
      )}
      <Box
        width={300}
        p={3}
        borderRadius={4}
        boxShadow={3}
        bgcolor={colors.primary[600]}
      >
        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          sx={{
            "& input": {
              fontSize: "20px",
            },
            "& label": {
              fontSize: "18px",
            },
          }}
        />
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{
            "& input": {
              fontSize: "20px",
            },
            "& label": {
              fontSize: "18px",
            },
          }}
        />
        <Button
          variant="contained"
          color="secondary"
          fullWidth
          size="large"
          onClick={handleLogin}
          mt={2}
          sx={{
            fontSize: "18px",
            color: "white",
          }}
          disabled={!isFormValid()}
        >
          Login
        </Button>
      </Box>
    </Box>
  );
};

export default LoginScreen;
