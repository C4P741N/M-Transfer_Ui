import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function Logout() {
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  setAuth({});
  navigate("/login", { replace: true });
}
