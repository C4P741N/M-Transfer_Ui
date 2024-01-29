import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function Logout() {
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  useEffect(() => {
    setAuth({});
    navigate("/login", { replace: true });
  }, []);

  return <></>;
}

export default Logout;
