import { axiosPrivate } from "../api/axios";
import { useContext, useEffect } from "react";
// import useRefreshToken from "./useRefreshToken";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthProvider";

const useAxiosPrivate = () => {
    // const refresh = useRefreshToken();
    const { auth } = useAuth();
    const navigate = useNavigate();
    // const { setAuth } = useContext(AuthContext);

    useEffect(() => {

        const requestIntercept = axiosPrivate.interceptors.request.use(
            config => {
                if (!config.headers['Authorization']) {
                    config.headers['Authorization'] = `Bearer ${auth?.accessToken}`;
                    console.log("In useAxiosPrivate, token is "+ JSON.stringify(auth))
                }
                // console.log("In useAxiosPrivate, not in if statement is "+ JSON.stringify(config));
                return config;
            }, (error) => Promise.reject(error)
        );

        const responseIntercept = axiosPrivate.interceptors.response.use(
            response => response,
            async (error) => {
                if(error?.response?.status === 401){
                    navigate("/tokenExpiry");
                }

                // console.log("In useAxiosPrivate, error is "+ error)
                
                return Promise.reject(error);
            }
        );

        return () => {
            axiosPrivate.interceptors.request.eject(requestIntercept);
            axiosPrivate.interceptors.response.eject(responseIntercept);
        }
    }, [auth])

    return axiosPrivate;
}

export default useAxiosPrivate;