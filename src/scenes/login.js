import React, { useState } from "react";
import { Box, Button, TextField, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";
import axios from "../api/axios";
import { EnumsFactory } from "../data/utilsAtLarge";
import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useEffect } from "react";
import { parseJwt } from "../components/DecryptToken";

const LOGIN_URL = "auth/authenticate";

const LoginScreen = () => {
  const userRef = useRef();
  const errRef = useRef();

  const navigate = useNavigate();

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const { auth, setAuth } = useAuth();

  useEffect(()=>{
    if (auth?.accessToken){
        navigate("/", { replace: true });
    }
  },[])

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({
          email: email,
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

      const userObj = parseJwt(accessToken);

      console.log('Token values are '+ JSON.stringify(userObj))

      const userId = userObj?.userName;
      setAuth({ roles, accessToken, expiration, userId });
      setemail("");
      setPassword("");
      navigate("/", { replace: true });
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing email or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Invalid email or Password");
      }
      errRef.current.focus();
    }
  };

  useEffect(() => {
    setErrMsg("");
  }, [email, password]);

  const isFormValid = () => {
    return email.trim() !== "" && password.trim() !== "";
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
        width={500}
        p={3}
        borderRadius={4}
        boxShadow={3}
        bgcolor={colors.primary[500]}
      >
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setemail(e.target.value)}
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
        <Typography variant="h4" mt={2}>
          Don't have an account?{" "}<br/>
          <Link component={Link} to="/register" color="white">
            Register here
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default LoginScreen;
