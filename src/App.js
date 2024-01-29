import React, { useState, useEffect, useContext } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Transact from "./scenes/transact";
import Invoices from "./scenes/invoices";
import Statements from "./scenes/statements";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import LoginScreen from "./scenes/login";
import RegistrationForm from "./scenes/register";
import RequireAuth from "./components/RequireAuth";
import useAuth from "./hooks/useAuth";
import TokenExpiredPage from "./scenes/tokenExpiry";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // const { auth } = useContext(AuthContext);
  const { auth } = useAuth();

  const toggleSidebar = () => {
    // setIsSidebarVisible((prev) => !prev);
  };

  const ROLES = {
    User: 2001,
    Editor: 1984,
    Admin: 5150,
  };

  useEffect(() => {
    console.log(auth);
    // Check if there is a token in the auth context
    // if (auth && auth?.token) {
    //   setIsAuthenticated(true);
    // } else {
    //   setIsAuthenticated(false);
    // }

    if (auth?.accessToken) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [auth]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          {isAuthenticated && <Sidebar isSidebar={isSidebarVisible} />}
          <main className="content">
            {isAuthenticated && <Topbar setIsSidebar={toggleSidebar} />}
            <Routes>
              <Route path="/login" element={<LoginScreen />} />
              <Route path="/register" element={<RegistrationForm />} />
              <Route path="tokenExpiry" element={<TokenExpiredPage />}/>

              <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
                <Route path="/" element={<Dashboard />} />
                <Route path="/transact" element={<Transact />} />
                <Route path="/contacts" element={<Statements />} />
                <Route path="/invoices" element={<Invoices />} />
              </Route>
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
