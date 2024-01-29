import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";
import { Link } from "react-router-dom";

const TokenExpiredPage = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

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
        variant="h1"
        fontWeight="bold"
        color={colors.grey[100]}
        mb={1}
      >
        Your session has expired. 
      </Typography>
      <Typography variant="h2" color={colors.grey[100]}>
        
        {" "}<br/>
          <Link  to="/login" color={colors.grey[100]}>
            Please LogIn
          </Link>
      </Typography>
      {/* You can provide a link to the login page or any other action you prefer */}
    </Box>
  );
};

export default TokenExpiredPage;
