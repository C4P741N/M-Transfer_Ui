import React, { useState } from "react";
import { Box, Button, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import TextBox from "../../components/TextBox";
import axios from "../../api/axios";
import { EnumsFactory } from "../../data/utilsAtLarge";

const REGISTER_URL = "/auth/register";

const RegistrationForm = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [userFocus, setUserFocus] = useState(false);

  const [password, setPassword] = useState("");
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [matchPwdFocus, setMatchPwdFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");

  const [email, setEmail] = useState("");
  const [emailFocus, setEmailFocus] = useState(false);

  const [InvalidValues, setInvalidValues] = useState(true);
  const [errors, setErrors] = useState({});

  const { auth } = useAuth();

  useEffect(() => {
    if (auth?.accessToken) {
      navigate("/", { replace: true });
    }
  }, []);

  const handleRegistration = async () => {
    try {
      const response = await axios.post(
        REGISTER_URL,
        JSON.stringify({
          user: username,
          pwd: password,
          authType: EnumsFactory.EnumsAtLarge.AuthTypes.Registration,
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      navigate("/login", { replace: true });
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 409) {
        setErrMsg("Username Taken");
      } else {
        setErrMsg("Registration Failed");
      }
      // errRef.current.focus();
    }
  };

  useEffect(() => {
    setErrMsg("");
    validateValues();
  }, [emailFocus, pwdFocus, matchPwdFocus, userFocus, matchPwd, password, email, username]);

  const validateValues = () => {
    const newErrors = {};

    if (!username.trim()) {
      newErrors.username = "Username is required";
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
    } else if (!validatePassword(password)) {
      newErrors.password =
        "Invalid password format. \n" +
        "Must contain 8 to 24 characters. \n" +
        "Must include uppercase and lowercase letters, a number and a special character.\n" +
        "Allowed special characters: ! @ # $ %";
    }

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!isValidEmail(email)) {
      newErrors.email = "Invalid email format";
    }

    if (password !== matchPwd) {
      newErrors.matchPassword = "Password does not match";
    }

    if (Object.keys(newErrors).length === 0) {
      setErrors({});
      setInvalidValues(false);
    } else {
      // Update errors state if validation fails
      setErrors(newErrors);
      setInvalidValues(true);
    }
  };

  // useEffect(()=>{
  //   const newErrors = {};

  //  if (pwdFocus && !validatePassword(password)) {
  //     newErrors.password = "Invalid password format. \n"+
  //     "Must contain 8 to 24 characters. \n"+
  //     "Must include uppercase and lowercase letters, a number and a special character.\n"+
  //     "Allowed special characters: ! @ # $ %";
  //   }

  //   setErrors(newErrors);

  // },[password]);

  const isValidEmail = (value) => {
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };
  const validatePassword = (value) => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,24}$/;
    return regex.test(value);
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
        <TextBox
          label="Username"
          value={username}
          onChange={(value) => setUsername(value)}
          error={errors.username}
          onFocus={() => setUserFocus(true)}
          onBlur={() => setUserFocus(false)}
        />
        <TextBox
          label="Email"
          value={email}
          onChange={(value) => setEmail(value)}
          error={errors.email}
          onFocus={() => setEmailFocus(true)}
          onBlur={() => setEmailFocus(false)}
        />
        <TextBox
          label="Password"
          value={password}
          onChange={(value) => setPassword(value)}
          error={errors.password}
          dataType="password"
          onFocus={() => setPwdFocus(true)}
          onBlur={() => setPwdFocus(false)}
        />

        <TextBox
          label="Confirm Password"
          value={matchPwd}
          onChange={(value) => setMatchPwd(value)}
          error={errors.matchPassword}
          dataType="password"
          onFocus={() => setMatchPwdFocus(true)}
          onBlur={() => setMatchPwdFocus(false)}
        />
        <Button
          variant="contained"
          color="secondary"
          fullWidth
          size="large"
          onClick={handleRegistration}
          mt={2}
          disabled={InvalidValues}
          sx={{
            fontSize: "18px",
            color: "white",
          }}
        >
          Register
        </Button>
        {/* <Typography
        variant="h4"
        fontWeight="bold"
        color={colors.grey[100]}
        mb={4}
      >
        <Link to="/">Sign In</Link>
      </Typography> */}
      <Typography variant="h4" mt={2}>
          Already have an account?{" "}<br/>
          <Link component={Link} to="/login" color="white">
            Login here
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default RegistrationForm;
