import { useEffect } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = ({ allowedRoles }) => {
    const { auth, setAuth } = useAuth();
    const location = useLocation();

    useEffect(() => {
        // Check if token has expired and redirect to login if needed
        if (auth?.accessToken) {
          console.log("RequireAuth "+ auth?.expiration)
          const tokenExpiration = new Date(auth?.expiration);
          if (tokenExpiration < new Date()) {
            setAuth({}); // Clear authentication data
          }
        }
        console.log("In RequireAuth "+ auth?.accessToken)
      }, [auth, setAuth]);

    return (
        auth?.roles?.find(role => allowedRoles?.includes(role))
            ? <Outlet />
            : auth?.user
                ? <Navigate to="/unauthorized" state={{ from: location }} replace />
                : <Navigate to="/login" state={{ from: location }} replace />
    );
}

export default RequireAuth;